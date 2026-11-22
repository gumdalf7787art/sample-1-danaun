import MemberShell from '../components/MemberShell';
import AccountPanel from '../components/AccountPanel';
export const metadata={title:'내 계정 | 다나은재활의학과의원',robots:{index:false,follow:false}};
export default function Page(){return <MemberShell title="나의 리셋 계정" description="계정과 로그인 방법을 관리하세요."><AccountPanel/></MemberShell>}
