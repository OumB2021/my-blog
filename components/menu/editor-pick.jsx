import MenuCard from "./menu-card";
import { IPost } from "@/models/Post";
import { getTopPicked } from "@/data/random-post";

async function EditorPick() {
  const picked = await getTopPicked();
  if (!picked) {
    return (
      <p className="text-muted-foreground text-sm">
        No editor-picked posts found.
      </p>
    );
  }
  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-sm text-muted-foreground font-medium">
        Chosen by the editor
      </h2>
      <h1 className="text-2xl font-bold">Editors pick</h1>
      <div className="mt-5 flex flex-col gap-[35px]">
        {picked.map((post) => (
          <MenuCard key={post.title} image={true} post={post} />
        ))}
      </div>
    </div>
  );
}
export default EditorPick;
