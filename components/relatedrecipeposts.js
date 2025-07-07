import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";
export default function RelatedPost({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}) {
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
    return (
      <div
        className="group cursor-pointer w-[262px] flex-shrink-0" // Fixed width for all posts
      >
        <div
          className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
          style={{ width: "262px", height: "160px" }} // Force image size
        >
          <Link
            href={`/${pathPrefix}/post/${post.slug?.current}`}
            className="relative block w-full h-full"
          >
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL,
                })}
                alt={post.mainImage?.alt || "Thumbnail"}
                loading="lazy"
                width={262} // Fixed width
                height={160} // Fixed height
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200 rounded-[8px]">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>
    
        {/* Content Wrapper with Fixed Height */}
        <div className="h-[130px] flex flex-col justify-between">
          <CategoryLabel categories={post.categories} nomargin={minimal} />
          <h2 className="text-lg font-semibold leading-snug tracking-tight">
            <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
              <span className="text-[#1F1F1F] text-[19px] font-bold">
                {post.title}
              </span>
            </Link>
          </h2>
          <time className="text-sm text-gray-500">
            {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}
          </time>
            </div>
          </div>
        
  
  );
}