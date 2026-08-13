import { getCollection } from 'astro:content';

export function getPublishedWriting() {
  return getCollection('blog', ({ data }) => !data.draft);
}
