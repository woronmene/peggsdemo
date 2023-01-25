/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
// import axios from "axios";
import Product from "../../components/Products/Product";
import styles from "./ProductGallery.module.scss";

function ProductGallery({ currentProducts, currentProduct, changeProduct }) {
  const [content, setContent] = useState("unsavedProducts");
  // const [bucketProducts, setBucketProducts] = useState([]);

  useEffect(() => {
    if (currentProducts) {
      changeProduct(currentProducts[0]);
    }
  }, [currentProducts]);

  const checkProduct = (prod) => currentProduct === prod;

  return (
    <div className={styles.productGallery}>
      <div className={styles.header}>
        <p
          className={`${styles.headerTab} ${content === "unsavedProducts" && styles.active}`}
          onClick={() => setContent("unsavedProducts")}
        >
          Unsaved Products
        </p>
        <p
          className={`${styles.headerTab} ${content === "savedProducts" && styles.active}`}
          onClick={() => setContent("savedProducts")}
        >
          Saved Products
        </p>
      </div>
      <div className={styles.body}>
        {content === "unsavedProducts" ? (
          <div className={styles.productSection}>
            {currentProducts &&
              currentProducts.map((product) => (
                <Product
                  key={product?.id}
                  name={product?.name}
                  image={product?.product_picture[0]}
                  active={checkProduct(product)}
                  changeProduct={changeProduct}
                  product={product}
                />
              ))}
          </div>
        ) : (
          <div className={styles.productSection}>
            {/* {bucketProducts &&
              bucketProducts.map((product) => (
                <Product
                  key={product?.id}
                  name={product?.name}
                  image={product?.product_picture[0]}
                  active={checkProduct(product)}
                  changeProduct={changeProduct}
                  product={product}
                />
              ))} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;
