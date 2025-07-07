"use client";
import Link from "next/link";
import {
  AllPostCategories,
  PostCategory,
} from "@/shared/entities/PostCategory";

interface CategoryListProps {
  topAndOtherCategories: AllPostCategories;
  onLinkClick: () => void; // Add onLinkClick prop
}

const CategoryList: React.FC<CategoryListProps> = ({
  topAndOtherCategories,
  onLinkClick, // Destructure onLinkClick
}) => {
  const { topCategories, otherCategories } = topAndOtherCategories;

  return (
    <div className="w-full"> {/* Ensure full width */}
      <div className="grid w-full grid-cols-4 gap-4 md:grid-cols-8 md:gap-6"> {/* Make the grid full width */}
        <h2 className="sr-only">Categories</h2> {/* Hidden heading for accessibility */}

        {/* Top Categories */}
        {topCategories.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category.slug ? category.slug : "#"}`}
            passHref
            onClick={onLinkClick} // Call onLinkClick when the link is clicked
          >
            <div className="flex flex-col items-center text-center">
              {/* Container for category icon */}
              <div
                className="rounded-lg outline outline-1 outline-offset-[-1px] outline-black flex items-center justify-center bg-[white 
                  w-[82px] h-[82px] md:w-[120px] md:h-[120px]"
              >
                {/* Category title inside the icon */}
                <span className="text-center font-openSans font-bold leading-normal text-black text-[11px] md:text-[14px]">
                  {category.title}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* "View all" Icon */}
        <div className="flex flex-col items-center text-center">
          <Link href="/archive" passHref onClick={onLinkClick}>
           {/* Container for "View all" */}
        <div
          className="rounded-lg flex items-center justify-center bg-[#f5f5f5]
            w-[82px] h-[82px] md:w-[120px] md:h-[120px]"
          
        >
          <p className="text-center font-openSans font-bold leading-normal text-black text-[11px] md:text-[14px]">

            <span>View all</span>
          </p>
        </div>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
