import { Description } from "../../data/description";
import Date from "../../data/nextMeeting.json";

const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-dark-warm"
      style={{
        minHeight: "52vh",
        paddingTop: "clamp(3.5rem, 8vw, 5.5rem)",
        paddingBottom: "clamp(3.5rem, 8vw, 5.5rem)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/HeroBackground.jpg')", opacity: 0.35 }}
        aria-hidden="true"
      />
      {/* Darkening overlay so text stays legible over the brighter image */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(12% 0.015 50 / 0.45)" }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex flex-col items-center text-center px-6 mx-auto w-full"
        style={{ maxWidth: "56rem" }}
      >
        <h1
          className="font-serif italic text-cream-soft leading-tight mb-5"
          style={{ fontSize: "clamp(2.8rem, 9vw, 4.8rem)", letterSpacing: "-0.01em" }}
        >
          Fleet Book Club
        </h1>

        <p
          className="font-sans leading-relaxed mb-8"
          style={{
            color: "oklch(80% 0.010 62)",
            fontSize: "clamp(0.9rem, 3.2vw, 1.05rem)",
            maxWidth: "52ch",
          }}
        >
          {Description}
        </p>

        <div
          className="flex flex-col items-center gap-1 font-sans"
        >
          <span
            style={{
              color: "oklch(60% 0.07 30)",
              fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Next meeting
          </span>
          <span
            className="font-serif italic text-cream-soft"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}
          >
            {Date}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
