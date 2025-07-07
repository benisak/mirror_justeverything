import { Ingredient } from "./Ingredient";
import { PostCategory } from "./PostCategory";

// Define the Recommendation interface based on your Sanity schema
export interface Recommendation {
  recommendationContent: string; // Replace with appropriate type if using complex blockContent
  recommendationUrl: string;
}

// Here we are defining the Recipe entity to structurize the data we get from Sanity
export interface Recipe {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  author?: string;
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  publishedAt?: string;
  categories: PostCategory[];
  ingredients: Ingredient[];
  recommendations?: Recommendation; // Added recommendations field
}

export interface Slug {
  slug: {
    current: string;
    _type: string;
  };
}
