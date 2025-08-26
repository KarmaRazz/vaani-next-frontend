export default function Testimonials({ data }) {
    return (
        <section className="section py-16" aria-labelledby="trust">
            <h2 id="trust" className="text-3xl font-bold">{data.title}</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
                {data.items.map((t, i) => (
                    <figure key={i} className="card p-6">
                        <blockquote className="text-gray-700">“{t.quote}”</blockquote>
                        <figcaption className="mt-4 text-sm text-gray-600">— {t.name}, {t.role}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}