"use client";
import { MoonLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center w-full">
      <MoonLoader color="#fff" />
    </div>
  );
}

export default Loader;
