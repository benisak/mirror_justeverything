import { Suspense } from "react";
import Search from "./search";
import Input from "./input";
import Loading from "@/components/loading";
import CategoryList from "@/components/categorylist";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const categoriesForList = await getCategorizedPostCategories(7); // Fetching categories

  return (
    <>
      <div className="px-4 md:px-[160px]"> {/* Applied padding here */}
        <div className="mt-14 flex items-center justify-center">
          <h1 className="text-brand-primary text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
        </div>

        <Input query={query} />

        <div className="w-full"> {/* Wrapping section */}
          <Suspense key={searchParams.search} fallback={<Loading />}>
            <Search searchParams={searchParams} />
          </Suspense>

          {/* Centered Text Above Category List */}
          <div 
            style={{
              color: "#1F1F1F",
              fontSize: 30,
              fontWeight: "700",
              wordWrap: "break-word",
              textAlign: "center",
              marginTop: 15
            }}
          >
            Or explore by category
          </div>

          {/* Category List Section */}
          <div className="w-full pt-6">
            <CategoryList topAndOtherCategories={categoriesForList} />
          </div>
        </div>
      </div>

      {/* Full-width Subscription Section (moved outside the padded container) */}
      <div className="w-full mt-12 bg-gray-100">
        <Subscription />
      </div>
    </>
  );
}
