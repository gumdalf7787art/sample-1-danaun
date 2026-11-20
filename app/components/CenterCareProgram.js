const icons = [
  'm15 15 5 5M16 10.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z',
  'm18 2 4 4m-5-1 2 2m-9 2 5 5m4-9-9 9H7l-1-1v-3l9-9M7 14l-5 5',
  'M4 19h16M6 15l4-4 3 3 5-7m-4 0h4v4',
  'M5 5h14v14H5zm3 7 3 3 5-6',
];

export default function CenterCareProgram({ id, title, duration, intro, items, note }) {
  return <section className="center-care-program" aria-labelledby={id} data-ro-reveal>
    <h3 id={id}>{title}{duration && <> <span>({duration})</span></>}</h3>
    <p className="center-program-intro">{intro}</p>
    <ul className="ro-concept-steps" data-ro-standards data-step-count={items.length} aria-label={duration ? title + ' 프로그램 구성' : title}>
      {items.map(([label, detail, icon], index) => (
        <li key={label} style={{'--standard-delay': index * 140 + 'ms', '--recovery-step': index}}>
          <span className="ro-standard-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={icon ?? icons[index]}/></svg>
          </span>
          <strong>{label}</strong><p>{detail}</p>
        </li>
      ))}
    </ul>
    <p className="center-program-note">{note}</p>
  </section>;
}
