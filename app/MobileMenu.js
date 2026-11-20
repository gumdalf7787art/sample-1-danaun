'use client';
import {useRef} from 'react';
import Link from 'next/link';
import {groups} from './content';
export default function MobileMenu(){const menu=useRef(null);return <details className="mobile-menu" ref={menu}><summary>메뉴</summary><nav aria-label="모바일 메뉴" onClick={e=>{if(e.target.closest('a'))menu.current.open=false}}>{groups.map(g=><div key={g.path}><Link href={g.path}>{g.title}</Link>{g.items.map(([n,p])=><Link key={p} href={p}>{n}</Link>)}</div>)}</nav></details>}
