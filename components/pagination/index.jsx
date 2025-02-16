"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center mt-5">
      <button
        className="bg-zinc-900 px-4 py-[10px] text-white text-sm font-medium rounded-sm disabled:bg-zinc-300 disabled:cursor-not-allowed"
        onClick={() => handlePagination(page - 1)}
        disabled={!hasPrev} // ✅ Fix: Disable if no previous page
      >
        Previous page
      </button>
      <button
        className="bg-zinc-900 px-4 py-[10px] text-white text-sm font-medium rounded-sm disabled:bg-zinc-300 disabled:cursor-not-allowed"
        onClick={() => handlePagination(page + 1)}
        disabled={!hasNext} // ✅ Fix: Disable if no next page
      >
        Next page
      </button>
    </div>
  );
}

export default Pagination;
