import Pagination from "../pagination";
import SinglePost from "./single-post";

const POST_PER_PAGE = 4;
const getData = async (page, cat) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}&limit=${
      POST_PER_PAGE + 1
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

async function CardList({ page, cat }) {
  const data = await getData(page, cat ?? "");

  const hasPrev = page > 1;
  const hasNext = data.length > POST_PER_PAGE;

  return (
    <div className="w-full md:w-2/3 ">
      <h1 className="text-3xl font-bold text-center md:text-left">
        Recent Posts
      </h1>
      <div className="">
        {data.slice(0, POST_PER_PAGE).map((post) => (
          <SinglePost key={post.slug} post={post} />
        ))}
      </div>

      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
}
export default CardList;
