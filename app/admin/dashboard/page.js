import OrdersTable from './components/ordersTable'
import { prisma } from '@/utils/prisma'

export default async function Dashboard() {
	const orders = await prisma.order.findMany({
		select: {
			id: true,
			status: true,
			total: true,
			user: {
				select: {
					name: true,
					email: true,
				},
			},
		},
	})

	const {
		_sum: { total },
	} = await prisma.order.aggregate({
		_sum: {
			total: true,
		},
		where: {
			status: {
				contains: 'completed',
			},
		},
	})

	return <OrdersTable orders={orders} total={total} />
}
