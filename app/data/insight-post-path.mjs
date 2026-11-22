export const columnPath = '/insights/column';
export const columnSampleSlug = 'reset-knee-pain-on-stairs';

export function insightPostPath(post) {
  const columnArticle = post.category === 'column';
  return (columnArticle ? columnPath : '/insights') + '/' + post.slug;
}

export function columnListQuery({q, page} = {}) {
  const query = new URLSearchParams();
  if (typeof q === 'string' && q.trim()) query.set('q', q.trim().slice(0, 200));
  if (typeof page === 'string' && /^[1-9]\d{0,5}$/.test(page) && page !== '1') query.set('page', page);
  return query.size ? '?' + query.toString() : '';
}
