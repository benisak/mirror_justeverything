import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;

  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-4 md:grid-cols-2"
        )}
      >
        {/* Image Section */}
        <div
          className={cx(
            "relative overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
          )}
          style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }} // Ensures a responsive aspect ratio
        >
          <Link
            href={`/${pathPrefix}/post/${post.slug?.current}`}
            className="absolute inset-0"
            style={{ display: "block" }}
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
                fill // Makes the image fill its parent container
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for responsiveness
                className="object-cover transition-all"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        {/* Text Section */}
        <div className={cx(minimal && "flex items-center")}>
          <div>
            <CategoryLabel
              categories={post.categories}
              nomargin={minimal}
              className="mb-0 mt-0"
            />
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-1"
              )}
            >
              <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
                <span
                  style={{
                    color: "var(--Black-500, #1F1F1F)",
                    fontSize: "19px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-900 dark:text-gray-400">
              {/* Updated datetime styling */}
              <time
                className="truncate"
                style={{
                  color: "var(--Black-500, #1F1F1F)",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
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
    </>
  );
}
