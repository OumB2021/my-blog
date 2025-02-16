import { cn, formattedDate } from "@/lib/utils";
import { ICategory } from "@/models/Category";
import { IPost } from "@/models/Post";
import { IUser } from "@/models/User";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getCategoryColor = (color) => {
  const colorMap = {
    red: "bg-red-100",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    purple: "bg-purple-100",
    emerald: "bg-emerald-100",
    orange: "bg-orange-100",
  };
  return colorMap[color] || "bg-gray-100";
};

function MenuCard({ image, post }) {
  if (!post) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  const user = post.user;
  const category = post.category;
  const { name } = user;
  const { title, color } = category;
  const date = formattedDate(post.createdAt);
  const categoryColor = getCategoryColor(color);

  return (
    <Link href={`/post/${post.slug}`} className="flex items-center gap-4">
      {image && post.image && (
        <div className="relative w-1/5 aspect-square ">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      <div className="w-4/5 flex flex-col gap-1">
        <span
          className={cn(
            "rounded-xl size-fit px-3 py-[2px] text-sm font-medium text-black",
            categoryColor
          )}
        >
          {title}
        </span>
        <h3 className="line-clamp-2 font-semibold text-zinc-600">
          {post.title}
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <span>{name}</span>
          <span className="text-muted-foreground">{date}</span>
        </div>
      </div>
    </Link>
  );
}

export default MenuCard;
