import React, { createContext, useEffect, useState } from 'react'
import axios from './axios'
export const productContext = createContext()
const Context = (props) => {
	const [products , setProducts] = useState(JSON.parse(localStorage.getItem("products")) || null);

	// const getProducts = async() =>{
	// 	try{
	// 		const {data} = await axios("/products")
	// 		setProducts(data)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	// console.log(products)
	// useEffect(()=>{
	// 	getProducts()
	// },[])

  return (
    <productContext.Provider value={[products, setProducts]}>
      {props.children}
    </productContext.Provider>
  );
}

export default Context
