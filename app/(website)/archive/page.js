import { Suspense } from "react";
import Archive from "./archive";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  return (
    <div className="relative px-4 md:px-[160px] mb-8 mt-6">
      <h1 className="font-openSans text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Blogs
      </h1>
      <div className="text-center">
        <p className="mt-2 text-lg">
          See all our interesting posts in one place
        </p>
      </div>
      {searchParams ? (
        <Archive searchParams={searchParams} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
