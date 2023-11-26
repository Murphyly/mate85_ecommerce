'use server'

import { prisma } from "@/utils/prisma"

async function queryAllProducts() {
	return await prisma.product.findMany();
}

export { queryAllProducts }
