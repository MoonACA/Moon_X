import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 w-full py-10 bg-[#00122C] h-[100vh]">
      <h1 className="text-3xl font-semibold text-white">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-[#FF6636] text-white px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
