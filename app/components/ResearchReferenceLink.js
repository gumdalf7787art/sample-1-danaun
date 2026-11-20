export default function ResearchReferenceLink({path}) {
  const query = new URLSearchParams({page: path});
  return <a className="research-reference-link" href={'/insights/research?' + query + '#reading-guide'}>
    근거연구에서 보기 <span aria-hidden="true">↗</span>
  </a>;
}
