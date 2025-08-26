"use client";
import Link from 'next/link';
import Image from 'next/image';
import site from '../data/site.json';
import { useEffect, useState } from 'react';




export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    return (
        <header className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow' : ''}`}>
            <div className="section h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={site.brand.logo} alt="Vaani logo" width={34} height={34} />
                    <span className="font-semibold text-lg">{site.brand.name}</span>
                </Link>


                <nav className="hidden md:flex items-center gap-6">
                    {site.navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="hover:text-vaani-accent">{link.label}</Link>
                    ))}
                </nav>


                <div className="hidden md:flex items-center gap-3">
                    <Link href={site.auth.login} className="btn-ghost">Login</Link>
                    <Link href={site.auth.signup} className="btn-primary">Register</Link>
                </div>


                <button className="md:hidden btn-ghost" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">☰</button>
            </div>


            {open && (
                <div className="md:hidden border-t">
                    <div className="section py-3 flex flex-col gap-2">
                        {site.navLinks.map(link => (
                            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2">{link.label}</Link>
                        ))}
                        <div className="flex gap-2 pt-2">
                            <Link href={site.auth.login} onClick={() => setOpen(false)} className="btn-ghost flex-1">Login</Link>
                            <Link href={site.auth.signup} onClick={() => setOpen(false)} className="btn-primary flex-1">Register</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}