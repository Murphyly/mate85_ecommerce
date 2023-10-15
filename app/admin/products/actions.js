'use server'
import { prisma } from "@/utils/prisma"
import { product_categories } from "@/utils/sampledata"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { storage } from '../../../firebase';

async function createProduct(data) {
    const newProduct = await prisma.product.create({
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseInt(data.get("category")),
        },
    })

    const productId = newProduct.id;

    redirect(`/admin/products/${productId}/productsItem/add`)
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
  
    try {
      await fileRef.put(file);
      console.log('Imagem enviada com sucesso.');
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
}

async function createProductItem(data) {
    await prisma.productItem.create({
        data: {
            sku: data.get("sku"),
            size: data.get("size"),
            amount: parseInt(data.get("amount")),
            price: parseFloat(data.get("price")),
            productItem_product: {
                connect: {
                    id: parseInt(data.get("product_id")),
                }
            },
        },
    })

    revalidatePath(`/admin/products/$1/productsItem/add`)
}

async function updateProduct(data) {
    await prisma.product.update({
        where: {
            id: parseInt(data.get("id")),
        },
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseFloat(data.get("category"))
        },

    })

    revalidatePath(`/admin/products/$1/productsItem/add`)
}

async function queryProductById(data) {
    return await prisma.product.findMany({
        where: {
            id: parseInt(data)
        },
        select: {
            id: true,
            name: true,
            description: true,
            rating: true,
            product_categories_id: true
        },
    })
}

async function queryProductCategory(data) {
    return await prisma.productCategory.findMany({
        where: {
            id: data? parseInt(data): null
        },
        select: {
            id: true,
            name: true,
        },
    })
}

async function queryAllProducts() {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            rating: true,
            product_categories_id: true,
        },
    })
}

async function queryAllProductsItem(data) {
    return await prisma.productItem.findMany({
        where: {
            product_id: parseInt(data)
        },
        select: {
            sku: true,
            price: true,
            size: true,
            amount: true,
        },
    })
}

export { createProduct, createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory }