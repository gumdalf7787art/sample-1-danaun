import './pretendard-subsets.css';
import './danaun.css';
import {Header,Footer} from './Site';
import {siteName,siteUrl} from './content';
export const metadata={metadataBase:new URL(siteUrl),title:{default:`${siteName} | 더 나은 움직임, 더 나은 일상`,template:`%s | ${siteName}`},description:'몸의 불편을 듣고, 움직임을 살피고, 일상을 함께 생각합니다. 다나은재활의학과의원 가상 홈페이지 시안.',robots:{index:false,follow:false},openGraph:{title:siteName,description:'편안하게 움직이는 일상, 다나은과 함께.',images:['/images/danaun-walking.png']},icons:{icon:'/danaun-symbol.svg'}};
export default function RootLayout({children}){return <html lang="ko"><body><Header/><main id="main">{children}</main><Footer/></body></html>}
