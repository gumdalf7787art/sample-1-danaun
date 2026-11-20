import MemberShell from '../../components/MemberShell';
import MemberForm from '../../components/MemberForm';
export const metadata={title:'새 비밀번호를 설정하세요. | 리셋재활의학과의원',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <MemberShell title="새 비밀번호를 설정하세요." description="변경 후 기존 로그인은 종료됩니다."><MemberForm mode="reset"/></MemberShell>}
