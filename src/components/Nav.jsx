import React, { useContext } from "react";
import { productContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(productContext);
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  console.log(distinct_category);

  const color = () =>
    `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.5)`;
  console.log(color());

  return (
    <nav className="w-full md:w-1/5 h-auto md:h-full p-3 md:pr-5 bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col gap-3">
      <div className="flex flex-row items-start sm:items-center justify-between gap-2">
        <Link
          className="px-2 py-1 text-xs border border-gray-500 rounded-md"
          to={`/`}
        >
          Home
        </Link>
        <Link
          to={`/create`}
          className="px-2 py-1 text-xs border border-gray-500 rounded-md"
        >
          Add New Product
        </Link>
      </div>

      <hr className="opacity-50 my-2" />

      <h1 className="text-lg font-semibold md:text-2xl">Category Filter</h1>
      <div className="flex flex-wrap gap-2">
        {distinct_category.map((cat, id) => (
          <Link
            key={id}
            to={`/?category=${cat}`}
            className="flex items-center gap-2 my-1 text-xs sm:text-sm md:text-base px-2 py-1 rounded hover:bg-white/30 transition"
          >
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ backgroundColor: color() }}
            ></span>
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
