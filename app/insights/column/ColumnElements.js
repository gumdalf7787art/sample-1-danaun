export function Source({href, children}) {
  return <a href={href} target="_blank" rel="noreferrer">{children} ↗</a>;
}

export function Photo({src, alt, caption, first = false}) {
  return (
    <figure className="column-photo">
      <img src={src} alt={alt || ''} width="1120" height="700"
        loading={first ? 'eager' : 'lazy'} fetchPriority={first ? 'high' : 'auto'} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
