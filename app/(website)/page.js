"use client"
import React, { useEffect, useState, useTransition } from 'react'
import Card from '@/components/ui/Card'
import { Prisma } from '@prisma/client';
import  Sidebar  from "@/components/categories/Sidebar";
import { queryAllProducts  } from "./product/actions"
import Link from 'next/link'
import { getHidePricesDB } from './actionsSettings'
import { ref, getDownloadURL, list } from "@firebase/storage";
import { storage } from "@/firebase";

export default function Home() {
	const [firstImageUrl, setFirstImageUrl] = useState([]);
	const [isPending,startTransition] = useTransition();
	const [products, setProducts] = useState([]);
	const [hidePrices, setHidePrices] = useState([]);

	const getRandomDefaultImage = () => {
		const defaultImages = [
		  '/static/images/default-image1.png',
		  '/static/images/default-image2.png',
		  '/static/images/default-image3.png',
		];
		const randomIndex = Math.floor(Math.random() * defaultImages.length);
		return defaultImages[randomIndex];
	};

	const getFirstImageFromFolder = async (productId) => {
		try {
			const folderPath = String(productId);
			const folderRef = ref(storage, folderPath);
			const items = await list(folderRef);

			if (items.items.length > 0) {
			const firstItemRef = items.items[0];
			const downloadURL = await getDownloadURL(firstItemRef);
			return downloadURL;
			}
		} catch (error) {
			console.error('Error getting the first image:', error);
		}
	};

	useEffect(() => {
		if(!isPending){
		  startTransition(async () => {

			const products = await queryAllProducts();
			setProducts(products);
			const hidePrices = await getHidePricesDB()
			setHidePrices(hidePrices);
		
			const imageUrls = await Promise.all(products.map((product) => getFirstImageFromFolder(product.id)));
			setFirstImageUrl(imageUrls);
		})
	  }
	},[])

	return (
		<main className="px-8 w-full flex py-16">
		  <Sidebar />
	
		  <div className="min-h-screen flex flex-col items-center justify-start gap-16">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
			  {products.map((product, index) => (
				<Link key={product.id} href={`/product/${product.id}`}>
				  <Card
					key={product.id}
					name={product.name}
					image={firstImageUrl[index] || getRandomDefaultImage()}
					price={hidePrices ? null : product.price}
					rating={product.rating}
				  />
				</Link>
			  ))}
			</div>
		  </div>
		</main>
	  );
	}