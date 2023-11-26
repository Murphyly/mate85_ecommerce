"use server"

const { prisma } = require("@/utils/prisma")

async function getProductsFromIds(data) {
    if (!data || !data.length)
        return []
    return await prisma.product.findMany({
        where: {
            id: { in: data }
        },
        include: {
            product_item: {}
        },
        orderBy: [
            {
                name: 'asc',
            },
        ],
    })
}

export { getProductsFromIds }