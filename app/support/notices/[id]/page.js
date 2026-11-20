import {notFound} from 'next/navigation';
import {pageMeta} from '../../../data/seo';
import {supportHome} from '../../../data/support';
import {notices, supportSections} from '../../../data/support-content';
import SupportShell from '../../SupportShell';
import {NoticeArticle} from '../../SupportPages';

export function generateStaticParams() {
  return notices.map(({id}) => ({id}));
}

function getNotice(id) {
  const notice = notices.find(entry => entry.id === id);
  if (!notice) notFound();
  return notice;
}

export async function generateMetadata({params}) {
  const notice = getNotice((await params).id);
  return pageMeta(supportHome + '/' + notice.id, notice.title + ' | 리셋재활의학과의원', notice.paragraphs[0], {noindex: notice.sample});
}

export default async function Page({params}) {
  const notice = getNotice((await params).id);
  return <SupportShell section="notices" {...supportSections.notices} notice={notice}
    summary={notice.date.replaceAll('-', '.')}><NoticeArticle notice={notice}/></SupportShell>;
}
