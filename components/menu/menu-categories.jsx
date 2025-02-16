import { ICategory } from "@/models/Category";
import CategoryCard from "../category-list/category-card";

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

async function MenuCategories() {
  const fetchedCategories = await getData();
  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-sm text-muted-foreground font-medium">
        Dicover by topic
      </h2>
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {fetchedCategories.map((category, i) => (
          <CategoryCard key={i} color={category.color} title={category.title} />
        ))}
      </div>
    </div>
  );
}
export default MenuCategories;
