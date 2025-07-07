import PostPage from "./default";
import { getRecipeBySlug, getRelatedRecipes } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getRecipeBySlug(params.slug);
    if (!post) {
      return {
        title: "Post Not Found",
        description: "This post does not exist."
      };
    }

    // Build image URL if a main image exists
    const imageObj = post.mainImage ? urlForImage(post.mainImage) : null;
    const imageUrl = imageObj?.src
      ? new URL(imageObj.src, "https://www.myoldwine.com").toString()
      : null;

    return {
      title: post.title || "Untitled Post",
      description: post.excerpt || "No description available.",
      openGraph: {
        title: post.title,
        description: post.excerpt || "No description available.",
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: imageObj?.width || 1200,
                height: imageObj?.height || 630,
                alt: post.title
              }
            ]
          : undefined
      },
      twitter: {
        title: post.title,
        description: post.excerpt || "No description available.",
        images: imageUrl ? [imageUrl] : undefined,
        card: "summary_large_image"
      }
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata."
    };
  }
}

export default async function PostDefault({ params }: { params: { slug: string } }) {
  try {
    const post = await getRecipeBySlug(params.slug);
    if (!post) {
      notFound();
    }

    // Ensure critical fields exist
    if (!post.slug) {
      throw new Error("Post is missing a slug.");
    }

    // Normalize the post slug: Use post.slug.current if available, otherwise post.slug
    const mainPostSlug =
      typeof post.slug === "object" && post.slug !== null && "current" in post.slug
        ? post.slug.current
        : post.slug;

    // Get related recipes based on first category slug
    const relatedRecipesSlugs = post.categories.map((category: any) => category.slug.current);
    const relatedRecipes = await getRelatedRecipes(relatedRecipesSlugs[0], 11);

    // Filter out the current post using the normalized slug value:
    const filteredRelatedRecipes = relatedRecipes.filter((recipe: any) => {
      const recipeSlug =
        typeof recipe.slug === "object" && recipe.slug !== null && "current" in recipe.slug
          ? recipe.slug.current
          : recipe.slug;

      return recipeSlug !== mainPostSlug;
    });

    return <PostPage post={post} relatedRecipes={filteredRelatedRecipes} />;
  } catch (error) {
    console.error("Error rendering post page:", error);
    notFound();
  }
}
