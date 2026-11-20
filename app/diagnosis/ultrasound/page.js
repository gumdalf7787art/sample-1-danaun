import { pageMeta } from '../../data/seo';
import { PageData } from '../../components/StructuredData';
import UltrasoundDiagnosis from '../../components/UltrasoundDiagnosis';
import { description, path, title } from '../../data/diagnosis-ultrasound';
import '../../regen-overview.css';
import '../../regen-prp-prf.css';
import '../../center-detail.css';
import '../../diagnosis-ultrasound.css';

export const metadata = pageMeta(path, '근골격계 초음파 진단 | 수지 리셋재활의학과의원', description);

export default function Page() {
  return <>
    <PageData path={path} name={title} medicalDescription={description} breadcrumbParent={{name:'정밀 진단', path:'/diagnosis'}}/>
    <UltrasoundDiagnosis/>
  </>;
}
