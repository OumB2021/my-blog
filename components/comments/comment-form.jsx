import { createComment } from "@/actions/create-comment";
import { Textarea } from "../ui/textarea";

function CommentForm({ slug }) {
  return (
    <form className="flex flex-col mt-4" action={createComment}>
      <input type="hidden" name="slug" value={slug} />
      <Textarea
        name="comment"
        placeholder="Write a comment..."
        className="w-full bg-white/90 focus-visible:ring-1 focus-visible:ring-ring h-[200px] placeholder:md:text-base placeholder:text-sm"
      />
      <button
        className="bg-zinc-800 px-4 py-[10px] text-zinc-50 size-fit rounded-md mt-4 self-end"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
export default CommentForm;
