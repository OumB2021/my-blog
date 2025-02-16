import { IPost } from "@/models/Post";
import MenuCard from "./menu-card";
import { getTrendingPosts } from "@/data/trending-post";

async function Trending() {
  const trendingPosts = await getTrendingPosts();
  if (!trendingPosts || trendingPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No trending posts found.</p>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-sm text-muted-foreground font-medium">
        What&apos;s trending?
      </h2>
      <h1 className="text-2xl font-bold">Most Popular</h1>
      <div className="mt-5 flex flex-col gap-[35px]">
        {trendingPosts.map((post) => (
          <MenuCard key={post.title} image={false} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Trending;
