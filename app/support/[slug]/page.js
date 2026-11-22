import {notFound} from 'next/navigation';
import {pageMeta} from '../../data/seo';
import {supportLinks} from '../../data/support';
import {supportSections} from '../../data/support-content';
import SupportShell from '../SupportShell';
import {Aftercare, Booking, FAQ, FirstVisit, Notices} from '../SupportPages';

const pages = {notices: Notices, booking: Booking, 'first-visit': FirstVisit, faq: FAQ, aftercare: Aftercare};

export function generateStaticParams() {
  return Object.keys(pages).map(slug => ({slug}));
}

function getSection(slug) {
  const link = supportLinks.find(([, path]) => path === '/support/' + slug);
  if (!link) notFound();
  return link;
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const [title, path] = getSection(slug);
  return pageMeta(path, title + ' | 다나은재활의학과의원', supportSections[slug].summary);
}

export default async function Page({params}) {
  const {slug} = await params;
  getSection(slug);
  const Content = pages[slug];
  return <SupportShell section={slug} {...supportSections[slug]}><Content/></SupportShell>;
}
