import site from '../data/site.json';


export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-16 bg-gray-50 border-t">
            <div className="section py-10 grid md:grid-cols-3 gap-6">
                <div>
                    <p className="font-semibold">{site.brand.name}</p>
                    <p className="text-sm text-gray-600 mt-2">Learning that actually moves the needle.</p>
                </div>
                <div>
                    <p className="font-semibold mb-2">Links</p>
                    <ul className="space-y-1 text-sm">
                        {site.navLinks.map(l => (<li key={l.href}><a href={l.href} className="hover:underline">{l.label}</a></li>))}
                    </ul>
                </div>
                <div>
                    <p className="font-semibold mb-2">More</p>
                    <ul className="space-y-1 text-sm">
                        {site.footerLinks.map(l => (<li key={l.href}><a href={l.href} className="hover:underline">{l.label}</a></li>))}
                    </ul>
                </div>
            </div>
            <div className="border-t">
                <div className="section py-4 text-sm text-gray-600">© {year} {site.brand.name}. All rights reserved.</div>
            </div>
        </footer>
    );
}