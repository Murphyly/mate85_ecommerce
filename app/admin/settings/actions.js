'use server'

import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/app/api/auth/[...nextauth]/route'

export async function updateSettings(data) {
	const session = await getServerSession()
	if (!session || !session.user.role || session.user.role != "admin") {
		return false
	}
	const transactions = []
	data.map((item) => {
		transactions.push(prisma.option.update({
			where: {
				key: item.key,
			},
			data: {
				value: item.value
			}
		}))
	})
	try {
		const res = prisma.$transaction(transactions)
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return false
		}
	}

	return true
}
