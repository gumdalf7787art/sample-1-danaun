import MemberShell from '../../components/MemberShell';
import MemberForm from '../../components/MemberForm';
export const metadata={title:'이메일을 확인합니다. | 리셋재활의학과의원',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <MemberShell title="이메일을 확인합니다." description="계정의 이메일 소유 여부를 확인합니다."><MemberForm mode="verify"/></MemberShell>}
