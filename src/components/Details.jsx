import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productContext } from "../utils/Context";
import axios from "../utils/axios";
import Loading from "./Loading";

const Details = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id,typeof id);
  console.log(products);

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // 
  useEffect(() => {
    if (!product) {
      setProduct(products.filter((item) => item.id == id)[0]);
    }

    
    
  },[products, id, product, setProduct]);

  console.log(products.filter((item) => item.id == id));
  console.log(product);

  const handleDelete = () => {
    const updatedProducts = products.filter((item) => item.id != id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct(null);
    navigate(-1); // Navigate back to the previous page after deletion
    // Optionally, you can also show a success message or redirect to another page
    alert("Product deleted successfully!");
  };
  
  return product ? (
    <div className="container mx-auto p-4 h-full bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col md:flex-row items-center justify-center gap-15">
      <img
        className="h-[60vw] sm:h-[45vw] md:h-[40vw] lg:h-[35vw] object-cover"
        src={`${product.image}`}
        alt=""
      />
      <div className="mb-[10vw] flex flex-col space-y-3">
        <h1 className="text-xl font-semibold text-purple-700 sm:text-2xl md:text-3xl lg:text-4xl">{product.title}</h1>
        <h3 className="opacity-70">{product.category}</h3>
        <h2 className="text-red-500">$ {product.price}</h2>
        <p className="text-xs font-semibold w-70">{product.description}</p>
        <div className="flex gap-5">
          <Link
            to={`/edit/${product.id}`}
            className="py-2 px-5 border rounded-md border-blue-300 text-blue-400"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="py-2 px-5 border rounded-md border-red-300 text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
