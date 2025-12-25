import React from 'react';

export default function CollectionCard({ product }) {
  return (
    <div
      className="product-card shrink-0 h-[500px] min-w-[350px] max-w-[350px] bg-white border border-black/10 p-5 text-center shadow-sm flex flex-col font-light mx-2"
    >
      <img
        src={product.image || "https://placeholder.pics/svg/300x400"}
        alt={product.name}
        className="w-full h-[350px] object-cover mb-4"
      />
      <div className="flex-none">
        <h4 className="text-sm mb-1.5 text-black/80">{product.name}</h4>
        <span className="text-black/60 text-xs uppercase tracking-wide">{product.price}</span>
      </div>
    </div>
  );
}

