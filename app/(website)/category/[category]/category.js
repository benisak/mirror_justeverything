import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import PostList from "@/components/postlist";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function Author(props) {
  const { loading, recipes, title } = props;

  if (!loading && !recipes.length) {
    notFound();
  }

  return (
    <div className=" mb-10 mt-14 lg:gap-[55px] px-4 md:px-[160px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-[36px] font-bold leading-normal text-[#1F1F1F] dark:text-white lg:text-[36px]">

          {title}
        </h1>
        <p className="mt-1 text-gray-600">
          {recipes.length} Articles
        </p>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {recipes.map((post) => (
          <PostList
            pathPrefix={"blog"}
            key={post._id}
            post={post}
            aspect="square"
          />
        ))}
      </div>
    </div>
  );
}
