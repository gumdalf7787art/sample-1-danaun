import {pageMeta} from '../data/seo';
import {PageData} from '../components/StructuredData';
import {PolicyDocument} from '../components/PolicyShell';
import {policies} from '../data/policies';
const originalMetadata={title:'개인정보처리방침 | 리셋재활의학과의원',description:'병원 확인 항목을 표시한 개인정보처리방침 검토용 초안.',robots:{index:false,follow:false}};
export const metadata=pageMeta('/privacy',originalMetadata.title,originalMetadata.description,{noindex:true});
export default function Page(){return <><PageData path="/privacy" name={originalMetadata.title}/><PolicyDocument policy={policies.privacy} active="/privacy"/></>}
