'use client'
import Link from 'next/link'
import { SearchProduct } from '@/components/SearchProduct'
import { useEffect, useState } from 'react'
import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react'

// Adicionar server actions aqui para editar e deletar
export function AdminTable(props) {
	const [filterValue, setFilterValue] = useState('')
	const [propsData, setPropsData] = useState([])

	useEffect(() => {
		if (filterValue) {
			setPropsData(
				props.data.filter((el) => {
					return el.name.toLowerCase().includes(filterValue.toLowerCase())
				})
			)
		}
	}, [filterValue, props.data])

	useEffect(() => {
		if (props.data) {
			setPropsData(props.data)
		}
	}, [props.data])

	return (
		<main className="p-12 w-full">
			<Card>
				{props.hasSearchBar && (
					<SearchProduct
						placeholder="Pesquisa pelo nome"
						filterValue={filterValue}
						setFilterValue={setFilterValue}
						className="w-3"
					/>
				)}

				<div className="bg-white text-zinc-700 border-solid rounded-lg h-fit w-full mt-4">
					<h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b">
						{props.title}
					</h1>
					<Table className="mt-6">
						<TableHead>
							<TableRow>
								{props.headers.map((header) => {
									return (
										<TableHeaderCell key={header}>
											{header}
										</TableHeaderCell>
									)
								})}
							</TableRow>
						</TableHead>

						<TableBody>
							{propsData.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{Object.keys(row).map((key) => (
										<TableCell key={key} className="text-right">
											{row[key]}
										</TableCell>
									))}
									<TableCell className="text-right">
										{props.actions.map((action, index) => (
											<Link
												key={action.name + '-' + index}
												href={action.dest.replace('$1', row.id)}
											>
												<button
													className={
														'bg-' +
														action.color +
														'-500 hover:bg-' +
														action.color +
														'-700 text-zin-900 font-bold py-2 px-4 mr-2'
													}
												>
													{action.name}
												</button>
											</Link>
										))}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
		</main>
	)
}
