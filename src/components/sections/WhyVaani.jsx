export default function WhyVaani({ data }) {
    return (
        <section className="section py-16" aria-labelledby="why">
            <h2 id="why" className="text-3xl font-bold">{data.title}</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.bullets.map((b, i) => (
                    <div key={i} className="card p-6">
                        <div className="text-3xl" aria-hidden>{b.icon}</div>
                        <p className="mt-3 font-semibold">{b.title}</p>
                        <p className="text-gray-600">{b.blurb}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}