export default function NotesSection({ data }) {
    return (
        <section className="section py-16">
            <div className="flex items-center justify-center">
                <h2 className="text-3xl font-bold ">{data.title}</h2>
                
            </div>


            <div className="mt-8 grid sm:grid-cols-2 gap-6">
                {data.categories.map((c) => (
                    <div key={c.slug} className="card p-6 hover:shadow transition">
                        <h3 className="text-xl font-semibold">{c.title}</h3>
                        <p className="text-gray-600 mt-2">Coming soon — this will list topics once connected to the backend.</p>
                    </div>
                ))}
            </div>
        </section>
    );
}