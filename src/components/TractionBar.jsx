const traction = [
  { value: '$95K', label: 'raised for Vivacity' },
  { value: 'six-figure', label: 'partnership signed' },
  { value: '₹2L', label: "founders' capital committed" },
  { value: '4,500+', label: 'ByteForge students' },
];

const TractionBar = () => (
  <section className="studio-traction" id="traction" aria-labelledby="traction-title">
    <div className="studio-traction-heading">
      <p className="studio-kicker">traction</p>
      <h2 id="traction-title">the short version</h2>
    </div>
    <div className="studio-traction-grid">
      {traction.map((item) => (
        <div className="studio-traction-stat" key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TractionBar;
