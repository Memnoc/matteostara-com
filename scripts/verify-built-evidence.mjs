import { execFile as execFileCallback } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import { builtEntries } from '../src/portfolio.ts';

const GITHUB = 'https://github.com';
const GITHUB_RAW = 'https://raw.githubusercontent.com';
const GITHUB_CODELOAD = 'https://codeload.github.com';
const REQUEST_HEADERS = {
  'User-Agent': 'memnoc-dev-built-evidence-check',
};
const execFile = promisify(execFileCallback);

export const BUILT_CANDIDATES = builtEntries;

export class EvidenceVerificationError extends Error {
  constructor(candidate, message) {
    super(`${candidate.name} (${candidate.repository}): ${message}`);
    this.name = 'EvidenceVerificationError';
  }
}

async function fetchRequired(candidate, url, description) {
  let response;

  try {
    response = await fetch(url, {
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw new EvidenceVerificationError(
      candidate,
      `${description} is unavailable: ${error.message}`,
    );
  }

  if (!response.ok) {
    throw new EvidenceVerificationError(
      candidate,
      `${description} is unavailable (HTTP ${response.status} ${response.statusText})`,
    );
  }

  return response;
}

function parseRepositoryPage(candidate, html) {
  const defaultBranch = html.match(/"defaultBranch":"([^"]+)"/)?.[1];
  const commit = html.match(/"currentOid":"([0-9a-f]{40})"/)?.[1];
  const isFork = html.match(/"isFork":(true|false)/)?.[1];

  if (!defaultBranch || !commit || !isFork) {
    throw new EvidenceVerificationError(
      candidate,
      'public repository page does not expose its default branch and revision',
    );
  }

  return { defaultBranch, commit, isFork: isFork === 'true' };
}

async function verifyGithubWorkflow(candidate, commit, workflow) {
  const encodedWorkflow = encodeURIComponent(workflow);
  const response = await fetchRequired(
    candidate,
    `${GITHUB}/${candidate.repository}/actions/workflows/${encodedWorkflow}?query=branch%3A${encodeURIComponent(candidate.expectedDefaultBranch)}`,
    `clean build workflow ${workflow}`,
  );
  const html = await response.text();
  const escapedRepository = candidate.repository.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const successfulRevision = new RegExp(
    `aria-label="completed successfully:[^"]*"[\\s\\S]{0,3000}?href="/${escapedRepository}/commit/${commit}"`,
  );

  if (!successfulRevision.test(html)) {
    throw new EvidenceVerificationError(
      candidate,
      `clean build is not successful at ${commit.slice(0, 8)}: workflow ${workflow}`,
    );
  }
}

async function verifyRepositoryCommands(candidate, commit, commands) {
  const checkout = await mkdtemp(join(tmpdir(), 'portfolio-built-evidence-'));
  const archive = join(checkout, 'repository.tar.gz');

  try {
    const response = await fetchRequired(
      candidate,
      `${GITHUB_CODELOAD}/${candidate.repository}/tar.gz/${commit}`,
      `source archive for ${commit.slice(0, 8)}`,
    );
    await writeFile(archive, Buffer.from(await response.arrayBuffer()));
    await execFile('tar', [
      '-xzf',
      archive,
      '--strip-components=1',
      '-C',
      checkout,
    ]);

    for (const [command, ...args] of commands) {
      try {
        await execFile(command, args, { cwd: checkout });
      } catch (error) {
        const detail = error.stderr?.trim() || error.stdout?.trim() || error.message;
        throw new EvidenceVerificationError(
          candidate,
          `clean build command failed at ${commit.slice(0, 8)}: ${[command, ...args].join(' ')} (${detail})`,
        );
      }
    }
  } finally {
    await rm(checkout, { recursive: true, force: true });
  }
}

async function verifyCleanBuild(candidate, commit) {
  if (candidate.cleanBuild.type === 'github-workflow') {
    await verifyGithubWorkflow(candidate, commit, candidate.cleanBuild.workflow);
    return;
  }

  await verifyRepositoryCommands(candidate, commit, candidate.cleanBuild.commands);
}

async function verifyCandidate(candidate) {
  const repositoryUrl = `${GITHUB}/${candidate.repository}`;
  const repositoryResponse = await fetchRequired(candidate, repositoryUrl, 'public repository');
  const repository = parseRepositoryPage(candidate, await repositoryResponse.text());

  if (repository.isFork) {
    throw new EvidenceVerificationError(candidate, 'repository is a GitHub fork');
  }
  if (repository.defaultBranch !== candidate.expectedDefaultBranch) {
    throw new EvidenceVerificationError(
      candidate,
      `default branch is ${JSON.stringify(repository.defaultBranch)}, expected ${JSON.stringify(candidate.expectedDefaultBranch)}`,
    );
  }

  for (const path of candidate.sourcePaths) {
    await fetchRequired(
      candidate,
      `${GITHUB_RAW}/${candidate.repository}/${repository.commit}/${path}`,
      `working source ${path} at ${repository.commit.slice(0, 8)}`,
    );
  }

  const evidence = ['working source'];
  await verifyCleanBuild(candidate, repository.commit);
  evidence.push('clean build');

  const documentCache = new Map();
  for (const document of candidate.evidenceDocuments) {
    let text = documentCache.get(document.path);
    if (text === undefined) {
      const rawUrl = `${GITHUB_RAW}/${candidate.repository}/${repository.commit}/${document.path}`;
      const response = await fetchRequired(
        candidate,
        rawUrl,
        `${document.label} document ${document.path}`,
      );
      text = await response.text();
      documentCache.set(document.path, text);
    }

    const missingStatements = document.patterns.filter((pattern) => !pattern.test(text));
    if (missingStatements.length > 0) {
      throw new EvidenceVerificationError(
        candidate,
        `${document.label} document ${document.path} does not contain the agreed evidence`,
      );
    }
    evidence.push(document.label);
  }

  return {
    name: candidate.name,
    repository: repositoryUrl,
    defaultBranch: repository.defaultBranch,
    commit: repository.commit,
    evidence,
  };
}

export async function verifyBuiltEvidence(candidates = BUILT_CANDIDATES) {
  const reports = [];
  for (const candidate of candidates) {
    reports.push(await verifyCandidate(candidate));
  }
  return reports;
}

async function main() {
  try {
    const reports = await verifyBuiltEvidence();
    for (const report of reports) {
      console.log(
        `${report.name}: ${report.defaultBranch}@${report.commit.slice(0, 8)} — ${report.evidence.join(', ')}`,
      );
    }
  } catch (error) {
    console.error(`Built evidence verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
