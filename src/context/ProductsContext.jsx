/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext } from "react";

const ProductsContext = React.createContext();

// eslint-disable-next-line react/prop-types
function ProductsProvider({ children }) {
  const [products, setProducts] = useState({});
  const [productDetails, setProductDetails] = useState({});

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  // const weight = "";

  // const [color, setColor] = useState("");
  // const [size, setSize] = useState("");
  // const [quantity, setQuantity] = useState(0);

  return (
    <ProductsContext.Provider
      value={{
        // size,
        // setSize,
        // quantity,
        // setQuantity,
        // color,
        // handleColorChange,
        // handleSizeChange,
        products,
        setProducts,
        productDetails,
        setProductDetails,
        color,
        setColor,
        size,
        setSize,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// make sure use
export const useProductsContext = () => useContext(ProductsContext);

export { ProductsContext, ProductsProvider };
