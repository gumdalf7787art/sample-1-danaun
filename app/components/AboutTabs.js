import {aboutLinks} from '../data/about';

export default function AboutTabs({active}) {
  return (
    <nav className="regen-tabs about-tabs" aria-label="다나은 소개 메뉴">
      {aboutLinks.map(([name, href]) => (
        <a key={href} href={href} aria-current={href === active ? 'page' : undefined}>{name}</a>
      ))}
    </nav>
  );
}
