import AboutDetail from '../components/AboutDetail';
import {supportHome, supportLinks} from '../data/support';
import './support.css';
import './board-detail.css';

export default function SupportShell({section, notice, label, summary, image, children}) {
  const href = '/support/' + section;
  const pageTitle = notice?.title || supportLinks.find(([, path]) => path === href)[0];
  return <AboutDetail path={notice ? href + '/' + notice.id : href} title={pageTitle}
    label={label} summary={summary} image={image} imagePosition="center 50%"
    showHero={!notice} categoryClass="support-site" parent={{name:'공지·상담', path:supportHome}}
    navigation={<nav className="regen-tabs support-tabs" aria-label="공지·상담 메뉴">
      {supportLinks.map(([name, path]) => <a key={path} href={path}
        aria-current={path === href ? (notice ? 'location' : 'page') : undefined}>{name}</a>)}
    </nav>}>
    {children}
  </AboutDetail>;
}
