export default function FeaturesBand({ items = [] }) {
    return (
        <section className="relative z-20 -mt-16">
            <div className="section">
                <div className="card p-2 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
                        {items.map((f, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 p-1">
                                <div className="text-3xl " aria-hidden>{f.icon}</div>
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold text-xl mb-2">{f.title}</p>
                                    <p className="text-gray-600">{f.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}