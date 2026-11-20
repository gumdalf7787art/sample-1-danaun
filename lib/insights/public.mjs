import {postRepository} from './repository.mjs';
import {publishedPosts} from './service.mjs';
import {starterPosts} from '../../app/data/insight-starter-posts.mjs';

export async function getPublishedPosts() {
  const stored = await postRepository.list();
  const storedSlugs = new Set(stored.map(post => post.slug));
  return [...publishedPosts(stored), ...starterPosts.filter(post => !storedSlugs.has(post.slug))]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getPost(slug) {
  return (await getPublishedPosts()).find(post => post.slug === slug);
}
