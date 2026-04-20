import React from "react";
import ProductCard from "../ProductCard/ProductCard";

function ProductList({ products, onProductClick, onProductEdit }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          onEdit={onProductEdit}
        />
      ))}
    </>
  );
}

export default ProductList;
