import Link from "next/link";
import Label from "@/components/ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  return (
    <div className="flex gap-2">
      {categories?.length &&
        categories.map((category, index) => {
          return (
            <Link
              href={`/category/${category.slug.current}`}
              key={index}>
              <Label nomargin={nomargin}>
                {category.title}
              </Label>
            </Link>
          );
        })}
    </div>
  );
}
