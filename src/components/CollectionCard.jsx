import React from 'react';

export default function CollectionCard({ product }) {
  return (
    <div
      className="product-card shrink-0 h-[55vh] w-[40vh] bg-white border border-black/10 p-5 text-center shadow-sm flex flex-col font-light"
    >
      <img
        src={product.image || "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB"}
        alt={product.name}
        className="w-full flex-1 min-h-0 object-cover mb-4"
      />
      <div className="flex-none">
        <h4 className="text-sm mb-1.5 text-black/80">{product.name}</h4>
        <span className="text-black/60 text-xs uppercase tracking-wide">{product.price}</span>
      </div>
    </div>
  );
}

