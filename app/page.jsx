import Hero           from "@/components/Hero";
import SixMoods       from "@/components/SixMoods";
import NewArrivals    from "@/components/NewArrivals";
import PopularPicks   from "@/components/PopularPicks";
import EditorialGrid  from "@/components/EditorialGrid";
import LatestTrends   from "@/components/LatestTrends";
import Testimonials   from "@/components/Testimonials";
import Footer         from "@/components/Footer";

/*
  SUDHOM Homepage — Section order:
  1. Hero          — full-bleed video/photo, big serif headline
  2. SixMoods      — arched portrait cards
  3. NewArrivals   — horizontal scroller, light bg
  4. PopularPicks  — Best Sellers scroller, wave dividers
  5. EditorialGrid — "Woven to Be Remembered" + "EDITS FOR every occasion"
  6. LatestTrends  — big bold type + editorial model photo
  7. Testimonials  — dark bg testimonial cards
  8. Footer        — dark, big watermark, newsletter
*/
export default function Home() {
  return (
    <main>
      <Hero />
      <SixMoods />
      <NewArrivals />
      <PopularPicks />
      <EditorialGrid />
      <LatestTrends />
      <Testimonials />
      <Footer />
    </main>
  );
}
