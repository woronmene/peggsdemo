/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Product.module.scss";

function Product({ name, active, changeProduct, product, image }) {
  return (
    <div
      className={`${styles.product} ${active && styles.active}`}
      onClick={() => {
        // console.log(product);
        changeProduct(product);
      }}
    >
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <p className={styles.productName}> {name}</p>
    </div>
  );
}

export default Product;
