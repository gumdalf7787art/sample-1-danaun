import MemberShell from '../components/MemberShell';
import MemberForm from '../components/MemberForm';
export const metadata={title:'다시 만나 반갑습니다. | 다나은재활의학과의원',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <MemberShell title="다시 만나 반갑습니다." description="회원 계정으로 로그인해 주세요."><MemberForm mode="login"/></MemberShell>}
