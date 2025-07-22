"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { BannerAd } from "@/components/blog/banner"; // Named import
import CategoryLabel from "@/components/blog/category";
import IngredientList from "@/components/blog/ingredientList";
import BannerRelatedRecipes from "@/components/bannerRelatedRecipes";

export default function Post(props) {
  const { loading, post, relatedRecipes } = props;

  // Redirect to 404 if post or slug is missing
  if (!loading && (!post || !post.slug)) {
    notFound();
  }

  // State to track if verification query parameter is valid
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);

  // Check for verification query parameter on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const verification = params.get("verification");
      if (verification === "dreamcode") {
        setHasQueryParamVerified(true); // Set state to true if verification matches
      }
    }
  }, []); // Run only once on mount

  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;

  return (
    <>
      <Container className="relative">
        {/* Main container for mobile and desktop */}
        <div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
          {/* First Column */}
          <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
            {/* Mobile-specific width */}
            <div className="flex w-full flex-col items-center px-0 md:items-start md:px-0">

              {/* Title */}
              <h1 className="font-noto text-brand-primary w-full text-3xl font-bold tracking-tight dark:text-white md:mt-4 lg:text-4xl lg:leading-snug">
                {post.title}
              </h1>

              {/* Date */}
              <div className="mt-4 flex w-full text-gray-500 md:mt-2">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-[#4B4B4B] dark:text-gray-400"
                        dateTime={post?.publishedAt || post._createdAt}
                      >
                        {format(
                          parseISO(post?.publishedAt || post._createdAt),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              </div>


              {/* Category */}
             <div className="mt-4 md:mt-2 flex w-full">
                <CategoryLabel categories={post.categories} />
              </div>

              {/* Recipe Image */}
              <div className="mt-6 md:mt-11 relative z-0 aspect-video w-full overflow-hidden lg:rounded-lg">
                {imageProps && (
                  <Image
                    src={imageProps.src}
                    alt={post.mainImage?.alt || "Thumbnail"}
                    loading="eager"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </div>
             


              {/* Recipe body */}
              <article className="prose mb-3 mt-6 w-full break-words dark:prose-invert prose-a:text-blue-600 md:mt-11">
                {post.body && <PortableText value={post.body} />}
              </article>
            </div>

            {/* Banner Ad (Respawns if verification is true) */}
            {hasQueryParamVerified && (
              <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] bg-transparent md:bg-[#F6F6F6] md:p-0">
                <BannerAd ingredients={post.ingredients} />
              </div>
            )}


            {/* Related Recipes */}
            <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] md:bg-[#F6F6F6] md:p-6 md:rounded-[16px]">
              <BannerRelatedRecipes relatedRecipes={relatedRecipes} />
            </div>

            {/* Mobile   Version */}
            <Link
              href="/archive"
              className="absolute left-1/2 inline-flex w-[calc(100%-32px)] -translate-x-1/2 transform items-center justify-center gap-[4px] rounded-[8px] border border-[#00A3C9] bg-white px-4 py-[14px] text-sm font-medium text-[#00A3C9] hover:bg-[#00A3C9] hover:text-white hover:border-[#00A3C9] transition-colors duration-300 ease-in-out md:hidden"
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                See all content
              </div>
            </Link>

                  </div>

          {/* Second Column */}
          <div className="md:mt-6 flex w-full flex-col gap-8 lg:w-[383px]">
            {/* Ingredients List */}
            <IngredientList ingredients={post.ingredients} />

            {/* Subscription Component (Desktop Only) */}
            <div className="hidden w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 lg:flex">
              {/* Heading Section */}
              <div className="flex flex-col gap-4">
              <h3
                className="font-openSans font-bold text-[20px] leading-[24px] text-black"
                style={{ color: "var(--Black-500, #1F1F1F)" }}
              >
                Stay Curious. Stay Updated.
              </h3>

              <p
                className="text-[16px] font-normal leading-[24px] text-black"
                style={{ color: "var(--Black-400, #4B4B4B)" }}
              >
                Get the latest stories, insights, and surprises straight to your inbox, just everything you love.
              </p>
              </div>

              {/* Input and Button Section */}
              <div className="flex gap-2">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="h-[51px] w-[226px] rounded-xl border border-gray-400 bg-white px-4 text-base text-gray-500 focus:outline-none"
                />
                {/* Subscribe Button */}
                <button
                  
                  className="bg-white border border-[#00A3C9] hover:border-[#00A3C9] text-[#00A3C9] hover:bg-[#00A3C9] hover:text-white transition-colors duration-300 ease-in-out h-[51px] w-[101px] break-words rounded-md text-[16px] font-semibold"
                >
                  Suscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile-specific Subscription Component (Full Width) */}
      <div className="flex w-full flex-col items-start justify-center gap-6 bg-[#F6F6F6] px-4 py-6 lg:hidden">
        <div className="flex w-full flex-col items-start justify-center gap-4">
        <h3
                className="font-openSans font-bold text-[20px] leading-[24px] text-black"
                style={{ color: "var(--Black-500, #1F1F1F)" }}
              >
                Stay Curious. Stay Updated.
              </h3>
              <p
                className="text-[16px] font-normal leading-[24px] text-black"
                style={{ color: "var(--Black-400, #4B4B4B)" }}
              >
                Get the latest stories, insights, and surprises straight to your inbox, just everything you love.
              </p>

        </div>
        <div className="flex w-full flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="h-[51px] flex-[219] rounded-xl border border-gray-400 bg-white px-4 text-base text-gray-500 focus:outline-none"
          />
          <button
            className="bg-[#00A3C9] border border-[#00A3C9] hover:border-[#00A3C9] text-white hover:bg-white hover:text-[#00A3C9] transition-colors duration-300 ease-in-out h-[51px] flex-[101px] rounded-md text-[16px] font-semibold hover:opacity-90"
          >
            Suscribe
          </button>
        </div>
      </div>
    </>
  );
}
