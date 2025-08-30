import Hero from '../components/sections/Hero';
import FeaturesBand from '../components/sections/FeaturesBand';
import NotesSection from '../components/sections/NotesSection';
import Testimonials from '../components/sections/Testimonials';
import WhyVaani from '../components/sections/WhyVaani';
import homeData from '../data/home.json';
import UserInfoModal from "../components/UserInfoModal";


export default function HomePage() {
  const { hero, features, notes, testimonials, why } = homeData;
  return (
    <>
      <Hero data={hero} />
      <div id="features">
      <FeaturesBand items={features} />
      </div>
      <div id="notes">
        <NotesSection data={notes} />
      </div>
      <Testimonials data={testimonials} />
      <WhyVaani data={why} />
      <div className="fixed bottom-4 right-4 z-50">
        <UserInfoModal />
      </div>

    </>
  );
}