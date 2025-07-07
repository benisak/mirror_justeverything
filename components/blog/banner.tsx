"use client";
import React, { useState, useEffect, useRef, JSX, useMemo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Ingredient {
  title: string;
  productImageUrl: string;
  starsRating: number;
  countRatings: number;
  price: number;
  url: string;
  discount?: number;
}

interface BannerAdProps {
  ingredients?: Ingredient[];
  modal_title?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({
  ingredients = [],
  modal_title,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      const starKey = `star-${i}`;
      if (i <= rating) {
        stars.push(
          <span key={starKey}>
            <FaStar className="star-icon text-[#FF9900]" />
          </span>
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <span key={starKey}>
            <FaStarHalfAlt className="star-icon text-[#FF9900]" />
          </span>
        );
      } else {
        stars.push(
          <span key={starKey}>
            <FaRegStar className="star-icon text-[#FF9900]" />
          </span>
        );
      }
    }
    return stars;
  };

  const [modifiedIngredients, setModifiedIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newTag = queryParams.get("tag");

    if (!newTag) {
      setModifiedIngredients(ingredients);
      return;
    }

    const updated = ingredients.map((item) => {
      try {
        const url = new URL(item.url);
        if (url.hostname.includes("amazon.")) {
          url.searchParams.set("tag", newTag);
          return { ...item, url: url.toString() };
        }
      } catch (e) {
        console.error("Invalid URL:", item.url);
      }
      return item; // return unchanged if not Amazon or bad URL
    });

    setModifiedIngredients(updated);
  }, [ingredients]);

  const handleOutboundLinkClick = (url: string) => {
    console.log("User clicked outbound link:", url);
  };

  const scrollPositionRef = useRef(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let hasOverlayAppeared = false;

    const showOverlay = () => {
      if (!hasOverlayAppeared) {
        setIsOverlayVisible(true);
        hasOverlayAppeared = true;
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        showOverlay();
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", handleScroll);

    timer = setTimeout(() => {
      showOverlay();
      window.removeEventListener("scroll", handleScroll);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");
    const closeButton = document.getElementById("close-menu");

    if (isOverlayVisible) {
      if (mobileMenu && overlay) {
        mobileMenu.classList.remove("hidden");
        overlay.classList.remove("hidden");
      }

      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      const preventBackgroundScroll = (e: TouchEvent) => {
        if (
          overlayRef.current &&
          !overlayRef.current.contains(e.target as Node)
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener(
        "touchmove",
        preventBackgroundScroll,
        {
          passive: false,
        }
      );

      const closeMenu = () => {
        if (mobileMenu && overlay) {
          mobileMenu.classList.add("hidden");
          overlay.classList.add("hidden");
        }

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "auto";

        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current);
        }, 0);

        setIsOverlayVisible(false);
        document.removeEventListener(
          "touchmove",
          preventBackgroundScroll
        );
      };

      if (closeButton) {
        closeButton.addEventListener("click", closeMenu);
      }

      return () => {
        closeButton?.removeEventListener("click", closeMenu);
      };
    }
  }, [isOverlayVisible]);

  // Use useMemo to optimize the rendering of ingredient links
  const memorizedIngredientLinks = useMemo(() => {
    return modifiedIngredients.map((ingredient) => {
      const { url } = ingredient;

      const linkProps = {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => handleOutboundLinkClick(url),
      };

      return {
        ...ingredient,
        linkProps,
      };
    });
  }, [modifiedIngredients]);

  return (
    <>
      {/* Overlay */}
      <div
        id="overlay"
        className={`fixed inset-0 z-40 ${
          isOverlayVisible ? "" : "hidden"
        } bg-gray-600 bg-opacity-60 sm:hidden`}
      ></div>

      {/* Mobile Menu Drop of Ingredients */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 z-50 ${
          isOverlayVisible ? "" : "hidden"
        } flex-col overflow-y-auto border-t border-gray-200 bg-white sm:hidden`}
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center pt-6">
          <h2 className="font-inter text-[15px] font-bold text-black">
            {modal_title || "Top Picks"}
          </h2>

          <a
            id="close-menu"
            {...(memorizedIngredientLinks[0]?.linkProps || {})}
            className="absolute right-4 inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
            style={{
              width: "auto",
              height: "auto",
              padding: "0.5rem",
            }}
          >
            <span className="text-xs">Buy Now</span>
            <svg
              className="svg_right close_button ml-1 h-6 w-6 cursor-pointer fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
            </svg>
          </a>
        </div>

        {/* Ingredient List Wrapper */}
        <ul className="mt-0 flex space-x-3 overflow-x-auto p-4">
          {memorizedIngredientLinks.map((ingredient, index) => (
            <li key={index} className="w-[40%] flex-shrink-0">
              {/* Left-aligned Image (same as text) */}
              <div className="mb-2">
                <a
                  {...ingredient.linkProps} //aquiiiiiii
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ingredient.productImageUrl}
                    alt={ingredient.title}
                    className="h-[120px] w-[120px] rounded-lg object-cover"
                  />
                </a>
              </div>
              <div className="text-left">
                <a {...ingredient.linkProps} className="transition hover:text-green-600">
                  <h3 className="line-clamp-2 text-sm font-normal leading-tight text-[#007185]">
                    {ingredient.title}
                  </h3>
                </a>
                <div className="flex h-[24px]">
                  {renderStars(ingredient.starsRating)}
                </div>
                <p className="text-xs font-normal text-[#565959]">
                  {ingredient.countRatings.toLocaleString("en-US")} opinions
                </p>
                <p className="text-base font-normal leading-6 text-[#B12704]">
                  US${ingredient.price.toFixed(2)}
                </p>
                {ingredient.discount && (
                  <span className="inline-block rounded bg-green-200 px-2 text-xs font-bold text-green-700">
                    {ingredient.discount}% OFF
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p
          className="ads_disclosure relative mb-4 flex items-center justify-center"
          style={{ fontSize: "0.63rem" }}
        >
          [Ad] As an Amazon Associate I earn from qualifying purchases*
        </p>
      </div>
    </>
  );
}