import {pageMeta} from '../data/seo';
import {PageData} from '../components/StructuredData';
import {PolicyDocument} from '../components/PolicyShell';
import {policies} from '../data/policies';
const originalMetadata={title:'이용약관 | 다나은재활의학과의원',description:'병원 확인 항목을 표시한 이용약관 검토용 초안.',robots:{index:false,follow:false}};
export const metadata=pageMeta('/terms',originalMetadata.title,originalMetadata.description,{noindex:true});
export default function Page(){return <><PageData path="/terms" name={originalMetadata.title}/><PolicyDocument policy={policies.terms} active="/terms"/></>}
