"use client";

import { useCart } from "@/components/CartContext";
import React, { useState } from "react";
import { toast } from "react-toastify";

/***
 * @param {Object} param0
 * @param {Object} param0.id
 * @param {string} param0.price
 * @param {string} param0.name
 */
export default function AddToCartButton({ sku, produto }) {
  const { addToCart } = useCart();
  function handleClick() {
    if (!sku)
      toast.error("Selecione um tamanho primeiro")
    else
      addToCart(sku, produto, qty);
  }

  const [qty, setQty] = useState(1)

  function addQty() {
    setQty(qty + 1)
  }

  function decQty() {
    setQty(qty - 1)
  }

  return (
    <>
      <div className="text-3xl flex-grow-0">
        <button onClick={decQty} className="bg-zinc-300 px-4 py-4 rounded-l-full">-</button>
        <input className="bg-zinc-300 px-4 py-4 text-center remove-arrow w-20" type="number" disabled value={qty}></input>
        <button onClick={addQty} className="bg-zinc-300 px-4 py-4 rounded-r-full">+</button>
      </div>
      <button
        onClick={handleClick}
        className="w-auto flex-grow py-4 px-8 rounded-full bg-black text-white"
      >
        Adicionar ao carrinho
      </button>
    </>
  );
}
