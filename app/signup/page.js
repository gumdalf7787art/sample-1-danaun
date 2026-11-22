import MemberShell from '../components/MemberShell';
import MemberForm from '../components/MemberForm';
export const metadata={title:'다나은과 함께 시작하세요. | 다나은재활의학과의원',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <MemberShell title="다나은과 함께 시작하세요." description="이메일·아이디 또는 SNS로 가입할 수 있습니다."><MemberForm mode="signup"/></MemberShell>}
