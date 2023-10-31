"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function CreateProductCategory(data) {
  const newProductCategory = await prisma.productCategory.create({
    data: { name: data.get("categoryName") },
  });

  const categoryId = newProductCategory.id;
  redirect(`/admin/products/categories/${categoryId}/edit`);
}

async function removeProductCategory(data) {
  await prisma.productCategory.delete({
    where: {
      id: +data.get("id"),
    },
  });

  redirect("/productCategory/");
}

async function updateProductCategory(data) {

  await prisma.productCategory.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      name: data.name,
    },
  });
  revalidatePath("/productCategory/");
}

async function queryAllProductCategories() {
  return await prisma.productCategory.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy:{
      id:"asc"
    }
  })
}

export {
  CreateProductCategory,
  removeProductCategory,
  updateProductCategory,
  queryAllProductCategories
};
