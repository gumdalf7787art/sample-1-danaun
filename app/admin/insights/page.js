import {headers} from 'next/headers';
import {assertAdmin} from '../../../lib/insights/access.mjs';
import AdminInsights from '../../components/AdminInsights';
import '../../admin.css';
export const metadata={title:'다나은 인사이트 관리자',robots:{index:false,follow:false}};
export default async function Admin(){try{await assertAdmin(await headers());}catch{return <main className="admin-denied"><h1>관리자 접근이 제한되어 있습니다.</h1><p>관리자로 지정된 회원 계정으로 로그인해 주세요.</p><a href="/login">회원 로그인 →</a></main>}return <AdminInsights/>}
