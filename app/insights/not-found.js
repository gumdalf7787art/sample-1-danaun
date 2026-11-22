import {DetailHeader,DetailFooter} from '../components/DetailShell';
export default function Missing(){return <div className="detail-site"><DetailHeader/><main className="insight-empty"><p className="eyebrow">DANAUN INSIGHTS</p><h1>글을 찾을 수 없습니다.</h1><p>주소가 변경되었거나 아직 공개되지 않은 글입니다.</p><a className="button navy" href="/insights">인사이트 목록으로 ↗</a></main><DetailFooter/></div>}
