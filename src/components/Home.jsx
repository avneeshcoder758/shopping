import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { productContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  // const [products] = useContext(productContext);
  const [products, setProducts] = useContext(productContext);
  console.log(products);
  const {search} = useLocation();
  console.log(search);
  const category = new URLSearchParams(search).get("category");
  console.log(typeof category, category);

  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // const getCategoryProducts = async ()=>{
  //   try{
  //     const {data} = await axios.get(`/products/category/${category}`);
  //     console.log(data);
  //     setFilteredProducts(data);
  //   } catch (error){
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    if (category) {
      setFilteredProducts(()=> products.filter((item) => item.category === category));
    }
    else {
      setFilteredProducts(products);
    } 
  }, [category, products]);


  return products ? (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row">
        <Nav />
        <div className=" w-full h-full bg-gradient-to-br from-blue-100 to-purple-300 p-5 flex flex-wrap gap-6 content-start justify-center md:justify-start overflow-x-hidden overflow-y-auto">
          {filteredProducts &&
            filteredProducts.map((product, idx) => (
              <Link
                key={idx}
                to={`/details/${product.id}`}
                className="card p-5 border shadow rounded w-1/6 min-w-[180px] h-[25vh] flex flex-col justify-center items-center"
              >
                <div
                  className="w-full h-[80%] mb-3 bg-contain bg-no-repeat bg-center hover:scale-110 transition duration-200"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                ></div>
                <h1 className="text-xs font-semibold hover:text-red-500">
                  {product.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
