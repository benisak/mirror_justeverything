import { PortableText } from "@/lib/sanity/plugins/portabletext";
import React, { useState, useEffect, useRef } from "react";

interface Recommendation {
  recommendationContent: any;
  recommendationUrl: string;
}

interface RecommendationsProps {
  recommendation: Recommendation;
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendation }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const scrollYRef = useRef(0); // Store scroll position
  const overlayRef = useRef<HTMLDivElement | null>(null); // Ref for overlay scrolling

  useEffect(() => {
    if (isOverlayVisible) {
      scrollYRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Prevent scrolling only on the background (not the overlay)
      const preventBackgroundScroll = (e: TouchEvent) => {
        if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
          e.preventDefault();
        }
      };
      document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        setTimeout(() => {
          window.scrollTo(0, scrollYRef.current);
        }, 0);

        document.removeEventListener("touchmove", preventBackgroundScroll);
      };
    }
  }, [isOverlayVisible]);

  const openMenu = () => setIsOverlayVisible(true);
  const closeMenu = () => setIsOverlayVisible(false);

  return (
    <div className="mx-auto max-w-3xl p-0">
      <h2 className="mb-1 hidden text-xl font-bold text-black sm:block">
        Recommendations
      </h2>

      {/* Recommendations List Wrapper */}
      <section className="prose dark:prose-invert hidden sm:block space-y-5">
        <PortableText value={recommendation.recommendationContent} />
      </section>

      {/* Desktop Buy Now Button */}
      <a
        href={recommendation?.recommendationUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#F93E6B] border border-[#F93E6B] text-white mt-8 hidden flex-[1_0_0] items-center justify-center gap-2 rounded-lg p-4 text-base font-semibold 
                   hover:bg-white hover:text-[#F93E6B] hover:border-[#F93E6B] transition-colors duration-300 ease-in-out sm:flex"
      >
        Get Recommendations
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={openMenu}
        className="fixed bottom-4 left-4 right-4 z-40 sm:hidden bg-[#F93E6B] text-white p-4 rounded-lg text-center font-semibold"
      >
        Get Recommendations
      </button>

      {/* Overlay */}
      {isOverlayVisible && (
        <>
          {/* Semi-transparent background covering the whole screen */}
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-60 sm:hidden transition-opacity duration-300"></div>

          {/* Mobile Menu with Space at the Top */}
          <div
            ref={overlayRef}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-y-auto border-t border-gray-200 bg-white sm:hidden transition-transform duration-300"
            style={{
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              maxHeight: "90vh", // Reduce height to leave space at the top
              top: "10vh", // Move the overlay down, leaving space at the top
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white border-white flex items-center justify-center p-4 shadow-sm">
              <h2 className="font-inter text-[15px] font-bold text-black">
                Recommendations
              </h2>
              <a
                href={recommendation?.recommendationUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="absolute right-4 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                style={{ width: "auto", height: "auto", padding: "0.5rem" }}
              >
                <span className="text-xs">Get Now</span>
                <svg
                  className="svg_right close_button h-6 w-6 cursor-pointer fill-current ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 1 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  ></path>
                </svg>
              </a>
            </div>

            {/* Recommendations List Wrapper */}
            <section className="prose dark:prose-invert p-4 space-y-4">
              <PortableText value={recommendation.recommendationContent} />
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Recommendations;
