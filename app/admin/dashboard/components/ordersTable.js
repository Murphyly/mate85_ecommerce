'use client'

import {
	Table,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableCell,
	Card,
	Flex,
	Title,
	Icon,
	Badge,
	Text,
	Metric,
	Button,
	DateRangePicker,
	SearchSelect,
	SearchSelectItem,
} from '@tremor/react'
import {
	AlertCircleIcon,
	CheckIcon,
	ClockIcon,
	LoaderIcon,
	MoreHorizontalIcon,
	PackageCheckIcon,
	SearchIcon,
	TruckIcon,
} from 'lucide-react'

const deltaTypes = {
	waiting: { icon: ClockIcon, color: 'gray' },
	'payment-pending': { icon: ClockIcon, color: 'red' },
	completed: { icon: CheckIcon, color: 'emerald' },
	shipped: { icon: TruckIcon, color: 'lime' },
	delivered: { icon: PackageCheckIcon, color: 'green' },
	processing: { icon: LoaderIcon, color: 'blue' },
}

const numberformatter = (number, decimals = 0) =>
	Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	})
		.format(Number(number))
		.toString()

function OrdersTable({ orders, total }) {
	return (
		<main className="p-12 w-full">
			<Card>
				<Flex className="mb-4" alignItems="start">
					<div className="truncate">
						<Text>Faturamento</Text>
						<Metric className="truncate">
							{numberformatter(total, 2)}
						</Metric>
					</div>
				</Flex>
				<div>
					<Flex
						className="space-x-0.5"
						justifyContent="start"
						alignItems="center"
					>
						<Title>Pedidos</Title>
						<Icon
							icon={AlertCircleIcon}
							variant="simple"
							tooltip="Lista de pedidos dos usuários"
						/>
					</Flex>
				</div>

				<div>
					<Flex className="space-x-2 mt-4" justifyContent="evenly">
						<SearchSelect
							className="max-w-full sm:max-w-xs"
							onValueChange={() => {}}
							placeholder="Buscar usuário..."
							icon={SearchIcon}
						>
							{orders
								.reduce((acc, curr) => {
									if (!acc.includes(curr.user.name)) {
										acc.push(curr.user.name)
									}
									return acc
								}, [])
								.map((name, index) => (
									<SearchSelectItem key={index} value={name}>
										{name}
									</SearchSelectItem>
								))}
						</SearchSelect>

						<DateRangePicker
							placeholder="Selecionar período"
							enableSelect={false}
							enableClear={true}
						/>
					</Flex>
				</div>

				<Table className="mt-6">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Pedido</TableHeaderCell>
							<TableHeaderCell className="text-right">
								Comprador
							</TableHeaderCell>
							<TableHeaderCell className="text-right">
								Contato
							</TableHeaderCell>
							<TableHeaderCell className="text-right">
								Total
							</TableHeaderCell>
							<TableHeaderCell className="text-right">
								Status
							</TableHeaderCell>
							<TableHeaderCell className="text-right">
								Ação
							</TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{orders.map((order) => (
							<TableRow key={order.id}>
								<TableCell>{order.id}</TableCell>
								<TableCell className="text-right">
									{order.user.name}
								</TableCell>
								<TableCell className="text-right">
									{order.user.email}
								</TableCell>
								<TableCell className="text-right">
									{numberformatter(order.total, 2)}
								</TableCell>
								<TableCell className="text-right">
									<Badge
										icon={deltaTypes[order.status].icon}
										color={deltaTypes[order.status].color}
									>
										{order.status}
									</Badge>
								</TableCell>
								<TableCell>
									<Button
										variant="light"
										icon={MoreHorizontalIcon}
										iconPosition="right"
									>
										Detalhes
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</main>
	)
}

export default OrdersTable
