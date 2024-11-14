"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { address } = useAccount();
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (!address) {
      setTimeout(() => router.push("/"), 3000);
    }
  }, [address]);

  return (
    <main className="flex justify-center items-center flex-col gap-6 bg-[#00122C] h-[100vh]">
      <h1 className="text-3xl font-semibold text-white">
        Something went wrong!
      </h1>
      <p className="text-lg text-white">
        {!address ? "Please connect your wallet" : `${error.message}`}
      </p>

      <button
        className="inline-block bg-[#FF6636] text-gray-200 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
