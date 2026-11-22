import {policyLinks} from '../data/policies';
export default function PolicyLinks(){return <nav className="policy-footer-links" aria-label="이용 안내 및 정책">{policyLinks.map(([name,url])=><a href={url} key={url}>{name}</a>)}</nav>}
