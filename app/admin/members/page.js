import {headers} from 'next/headers';
import {requireUser} from '../../../lib/auth/server.mjs';
import MemberShell from '../../components/MemberShell';
import MemberAdmin from '../../components/MemberAdmin';
export const metadata={title:'관리자 권한 관리 | 다나은',robots:{index:false,follow:false}};
export default async function Page(){try{await requireUser(await headers(),{owner:true})}catch{return <MemberShell title="관리자 권한 관리" description="최초 관리자만 이용할 수 있습니다."><a href="/login">회원 로그인 →</a></MemberShell>}return <MemberShell title="함께 관리하는 다나은" description="신뢰할 수 있는 회원에게 관리 권한을 부여하세요."><MemberAdmin/></MemberShell>}
