import HeroForm from "./HeroForm";

export default function Hero() {
  return (
    <div className="hero-main">
      <div className="relative hero-text text-center">
        <h1 className="text-5xl text-white font-semibold">
          Grand Central Bank of America
        </h1>
      </div>

      <HeroForm></HeroForm>
    </div>
  );
}
