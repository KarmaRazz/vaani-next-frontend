export default function FeaturesBand({ items = [] }) {
    return (
        <section className="section -mt-16">
            <div className="card p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
                    {items.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 p-4">
                            <div className="text-3xl" aria-hidden>{f.icon}</div>
                            <div>
                                <p className="font-semibold text-lg">{f.title}</p>
                                <p className="text-gray-600">{f.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}