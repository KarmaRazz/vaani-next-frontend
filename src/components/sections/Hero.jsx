import Image from 'next/image';
import Link from 'next/link';
import data from '../../data/home.json';
import site from '../../data/site.json';



export default function Hero({ data: hero }) {
    return (
        <section className="relative">
            <div className="relative h-[520px]">
                
                {/* <Image src={hero.bgImage} alt="Vaani hero" fill priority className="object-cover" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/20"  />
                <div className="section relative h-full flex items-center  h-auto bg-linear-to-r from-orange-400 to-red-500 object-cover">
                    <div className="max-w-2xl ">
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                            {hero.title}
                        </h1>

                        <p className="mt-4 text-lg text-gray-700">{hero.subtitle}</p>
                        <div className="mt-8">
                            <Link href={site.auth.signup} className="btn-other">{hero.cta}</Link>
                        </div>
                    </div>
                    <div className="m">
                    <Image src={hero.image} alt="girl" width={525} height={500} className=""/>
                    </div>
                </div>

            </div>
        </section>
    );
}