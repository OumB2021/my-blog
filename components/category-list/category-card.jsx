import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

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

async function CategoryCard({ color, title, image }) {
  const categoryColor = getCategoryColor(color);

  return (
    <Link
      href={`/blog?cat=${title}`}
      className={clsx(
        `flex items-center gap-2 ${
          image ? "h-[80px]" : "h-10"
        } rounded-md justify-center `,
        categoryColor
      )}
    >
      {image && (
        <Image
          src={`${image}`}
          alt="img"
          width={32}
          height={32}
          className="rounded-full object-cover h-8 w-8"
        />
      )}
      <span className="capitalize">{title}</span>
    </Link>
  );
}
export default CategoryCard;
