import CardList from "@/components/card-list";
import Menu from "@/components/menu";

async function BlogPage({ searchParams }) {
  const page = parseInt((await searchParams).page) || 1;
  const cat = (await searchParams).cat;

  return (
    <div className="flex flex-col items-center justify-center mt-[40px]">
      <h2 className="text-3xl font-bold  px-4 py-2 rounded-md">{cat} Blogs</h2>
      <div className="flex gap-12 w-full mt-[50px]">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
}
export default BlogPage;
