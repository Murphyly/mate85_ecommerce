"use client"

import Categories from "@/app/admin/products/categories/page";
import MultiRangeSlider from "../ui/mutiRangeSlider/multiRangeSlider";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState,useTransition } from "react";
import {AiFillFilter} from "react-icons/ai";
import {useRouter} from "next/navigation";
import { getCategories } from "@/app/(website)/shop/actions";
import { useSearchParams } from 'next/navigation'


const shirtSizes = ["P","M","G","GG"];

export default function Sidebar() {

  const searchParams = useSearchParams()
	const dmin = parseInt(searchParams.get('minPrice'))
	const dmax = parseInt(searchParams.get('maxPrice'))

  const [minPrice, setMinPrice] = useState(isNaN(dmin) ? 0 : dmin);
  const [maxPrice, setMaxPrice] = useState(isNaN(dmax) ? 100 : dmax);
  const [categoryId,setCategoryId] = useState("");
  const [categoryName,setCategoryName] = useState("");
  const [isPending,startTransition] = useTransition();
  const [categories,setCategories] = useState([]);
  const router = useRouter()

  const handlePriceFilterChange = (newMinPrice, newMaxPrice) => {
    if (newMinPrice !== minPrice) {
      setMinPrice(newMinPrice)
    } 
    else if (newMaxPrice !== maxPrice) {
      setMaxPrice(newMaxPrice)
    }
  }
  
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);

    setCategoryName(e.target.options[e.target.selectedIndex].text)
  }

  const apllyFilter = () => {

    
    router.push( `/shop?categoryId=${categoryId}&categoryName=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
    
  }
  
  useEffect(() => {
    if(!isPending){
      startTransition(async () => {
        const res = await getCategories();
        res.unshift({
          id:"",
          name:"",
        })
        setCategories(res);
      });
    }
  }, [])

  return (
    <div className="text-gray h-full w-1/5 p-4 rounded-lg border-solid border">
      <div className="flex justify-between items-baseline border-b">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <AiFillFilter />
      </div>

      <div className="p-5 mb-4 border-b">
        <label className="font-bold block mb-1">Preço</label>
        
        <MultiRangeSlider
          min={0}
          max={100}
          vmin={minPrice}
          vmax={maxPrice}
          onChange={({ min, max }) => handlePriceFilterChange(min, max)}
        />
        
        <label className="font-bold block mb-1">Categoria</label>

        <select className="p-2 rounded-md w-full" onChange={handleCategoryChange}>
          {categories.map((cat) => {
            
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
          })}
        </select>

      </div>

      <div className="flex justify-center">
        <button onClick={apllyFilter} className="bg-black text-white px-8 py-2 mx-auto rounded-full">Aplicar Filtro</button>
      </div>
    </div>
  );
}
