"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex justify-center items-center flex-col  bg-[#00122C] h-[100vh] gap-6">
      <h1 className="text-3xl font-semibold text-white">
        Something went wrong!
      </h1>
      <p className="text-lg text-white">{error.message}</p>

      <button
        className="inline-block bg-[#FF6636] text-gray-200 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
