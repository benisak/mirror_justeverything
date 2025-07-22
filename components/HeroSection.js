const HeroSection = () => {
  return (
    <section className="relative -mt-14 flex flex-col items-center justify-between bg-white px-0 md:flex-row md:px-0">
      {/* Icons for Desktop */}
      <div className="pointer-events-none absolute inset-0 hidden md:mt-9 md:block">
        {/* Icons around the section */}
        <img
          src="/img/icons/home.svg"
          alt="Icon 1"
          className="absolute left-[16%] top-[15%] h-[36.665px] w-[36.665px]"
        />
        <img
          src="/img/icons/map-pin.svg"
          alt="Icon 2"
          className="absolute right-[16%] top-[15%] h-[36.665px] w-[36.665px]"
        />
        <img
          src="/img/icons/send.svg"
          alt="Icon 3"
          className="absolute bottom-[10%] left-[15%] h-[36.665px] w-[36.665px]"
        />
        <img
          src="/img/icons/gift.svg"
          alt="Icon 4"
          className="absolute bottom-[15%] right-[15%] h-[36.665px] w-[36.665px]"
        />

        {/* Additional icons above the title */}
        <div className="absolute left-1/2 top-[-50px] flex -translate-x-1/2 transform justify-center gap-12 md:mt-8">
          <img
            src="/img/icons/smile.svg"
            alt="Smile SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[-10px] transform"
          />
          <img
            src="/img/icons/Vector.svg"
            alt="Vector SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[5px] transform"
          />
          <img
            src="/img/icons/headphones.svg"
            alt="Headphone SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[-15px] transform"
          />
          <img
            src="/img/icons/bookmark.svg"
            alt="Bookmart SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[8px] transform"
          />
          <img
            src="/img/icons/shopping-cart.svg"
            alt="Shopping Cart SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[-7px] transform"
          />
          <img
            src="/img/icons/music.svg"
            alt="Music SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[12px] transform"
          />
          <img
            src="/img/icons/camera.svg"
            alt="Camera SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[-10px] transform"
          />
          <img
            src="/img/icons/smile.svg"
            alt="Smile SVG"
            className="h-[36.665px] w-[36.665px] translate-y-[6px] transform"
          />
        </div>
      </div>

      {/* Icons for Mobile */}
      <div className="mb-4 flex flex-wrap justify-center gap-[21px] md:hidden">
        {[
          { src: "smile.svg", offset: "-5px" },
          { src: "Vector.svg", offset: "3px" },
          { src: "headphones.svg", offset: "-8px" },
          { src: "bookmark.svg", offset: "6px" },
          { src: "shopping-cart.svg", offset: "-4px" },
          { src: "music.svg", offset: "5px" },
          { src: "camera.svg", offset: "-6px" },
          { src: "smile.svg", offset: "4px" }
        ].map((icon, index) => (
          <img
            key={index}
            src={`/img/icons/${icon.src}`}
            alt={`Icon ${index + 1}`}
            className="h-[24px] w-[24px]"
            style={{ transform: `translateY(${icon.offset})` }}
          />
        ))}
      </div>

      {/* Text Section */}
      <div className="w-full px-0 text-left md:px-1 md:pl-6 md:text-center">
        <h1 className="mb-[15px] break-words font-openSans md:mt-16">
          <span className="block text-4xl font-bold text-[#000] md:inline">
            <span className="inline-block whitespace-nowrap">
              Discover <span className="text-[#00A3C9]">everything</span>
              ,
            </span>
          </span>{" "}
          <span className="block text-4xl font-bold text-[#000000] md:inline">
            one post at a time.
          </span>{" "}
        </h1>

        {/* Mobile Text Section */}
        <div
          className="block break-words text-left text-xl font-normal md:hidden md:px-[176px]"
          style={{ color: "var(--Black-500, #1F1F1F)" }}>
          Welcome to onlyeverything, the place where curiosity meets
          limitless possibilities. Whether you&apos;re looking for
          insightful thoughts, trending topics, deep dives into
          everyday wonders, or just a bit of fun, we&apos;ve got you
          covered.
        </div>

        {/* Desktop Text Section */}
        <div
          className="hidden break-words text-left text-xl font-normal md:block md:px-[150px] md:text-center lg:px-[130px]"
          style={{
            color: "var(--Black-500, #1F1F1F)",
            maxWidth: "85%",
            margin: "0 auto"
          }}>
          Welcome to justeverything, the place where curiosity meets
          limitless possibilities. Whether you&apos;re looking for
          insightful thoughts, trending topics, deep dives into
          everyday wonders, or just a bit of fun, we&apos;ve got you
          covered.
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
