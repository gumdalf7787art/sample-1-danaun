 'use client';
import {useEffect,useState} from 'react';
export default function AuthNav(){const [user,setUser]=useState(null);useEffect(()=>{fetch('/api/auth/me',{cache:'no-store'}).then(r=>r.json()).then(d=>setUser(d.user||null)).catch(()=>{})},[]);return <div className="auth-nav">{user?<><a href="/account">내 계정</a>{['owner','admin'].includes(user.role)&&<a href="/admin/insights">글 관리</a>}{user.role==='owner'&&<a href="/admin/members">관리자 지정</a>}</>:<><a href="/login">로그인</a><a href="/signup">회원가입</a></>}</div>}
