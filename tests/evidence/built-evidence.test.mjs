import assert from 'node:assert/strict';
import test from 'node:test';

import {
  BUILT_CANDIDATES,
  verifyBuiltEvidence,
} from '../../scripts/verify-built-evidence.mjs';

test('the public default branches carry every required Built-entry proof', async () => {
  const reports = await verifyBuiltEvidence(BUILT_CANDIDATES);

  assert.deepEqual(
    reports.map(({ name, defaultBranch, evidence }) => ({
      name,
      defaultBranch,
      evidence,
    })),
    [
      {
        name: 'CodeAtlas',
        defaultBranch: 'main',
        evidence: [
          'working source',
          'clean build',
          'runnable instructions',
          'license',
          'known limitations',
          'original-work account',
        ],
      },
      {
        name: 'Northstar',
        defaultBranch: 'main',
        evidence: [
          'working source',
          'clean build',
          'runnable instructions',
          'license',
          'known limitations',
          'adaptation account',
        ],
      },
    ],
  );
});

test('an unavailable public repository names the candidate and HTTP failure', async () => {
  const unavailable = {
    ...BUILT_CANDIDATES[0],
    repository: 'Memnoc/portfolio-evidence-check-no-such-repository',
  };

  await assert.rejects(
    verifyBuiltEvidence([unavailable]),
    {
      name: 'EvidenceVerificationError',
      message:
        'CodeAtlas (Memnoc/portfolio-evidence-check-no-such-repository): public repository is unavailable (HTTP 404 Not Found)',
    },
  );
});

test('an unexpected default branch reports the expected and public names', async () => {
  const unexpectedDefault = {
    ...BUILT_CANDIDATES[0],
    expectedDefaultBranch: 'portfolio-evidence-check-no-such-branch',
  };

  await assert.rejects(
    verifyBuiltEvidence([unexpectedDefault]),
    {
      name: 'EvidenceVerificationError',
      message:
        'CodeAtlas (Memnoc/CodeAtlas): default branch is "main", expected "portfolio-evidence-check-no-such-branch"',
    },
  );
});

test('a missing required evidence document reports its branch path and purpose', async () => {
  const missingDocument = {
    ...BUILT_CANDIDATES[0],
    evidenceDocuments: [
      {
        label: 'known limitations',
        path: 'docs/portfolio-evidence-check-no-such-document.md',
        patterns: [/not reached/],
      },
    ],
  };

  await assert.rejects(
    verifyBuiltEvidence([missingDocument]),
    {
      name: 'EvidenceVerificationError',
      message:
        'CodeAtlas (Memnoc/CodeAtlas): known limitations document docs/portfolio-evidence-check-no-such-document.md is unavailable (HTTP 404 Not Found)',
    },
  );
});

test('a missing successful clean-build check reports the public revision and check', async () => {
  const missingBuild = {
    ...BUILT_CANDIDATES[0],
    cleanBuild: {
      type: 'github-workflow',
      workflow: 'portfolio-evidence-check-no-such-build.yml',
    },
  };

  await assert.rejects(
    verifyBuiltEvidence([missingBuild]),
    (error) => {
      assert.equal(error.name, 'EvidenceVerificationError');
      assert.match(
        error.message,
        /^CodeAtlas \(Memnoc\/CodeAtlas\): clean build is not successful at [0-9a-f]{8}: workflow portfolio-evidence-check-no-such-build\.yml$/,
      );
      return true;
    },
  );
});
