import CategoryCard from "./category-card";
import { ICategory } from "@/models/Category";

const getData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

async function CategoryList() {
  const fetchedCategories = await getData();

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-center md:text-left">
        Popular Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full justify-between gap-4 mt-5">
        {fetchedCategories.map((category) => (
          <CategoryCard
            key={category.slug}
            color={category.color}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}
export default CategoryList;
