'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import EditableCell from './editableCell'
import { Edit2Icon } from 'lucide-react'
import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react'

export default function EditableTable(props) {
	const [data, setData] = useState(props.data)
	const [editedRows, setEditedRows] = useState([])

	const handleRowChange = async (e) => {
		const row = e.target.getAttribute('row')
		props.action(data[row]) //Rever a action passada nas props
	}

	return (
		<main className="p-12 w-full">
			<Card>
				<div className="overflow-x-auto flex flex-col flex-wrap justify-center">
					<h3 className="text-2xl font-bold border-b-zinc-600 border-b text-zinc-900 mt-4 mb-6">
						Categorias
					</h3>
					<Table className="mt-6">
						<TableHead>
							<TableRow>
								{props.headers.map((header) => (
									<TableHeaderCell
										key={header}
										scope="col"
										className={`${
											header === 'Categoria' ? 'w-4/5' : ''
										} ${header === 'Id' ? 'w-1/5' : ''}`}
									>
										{header}
									</TableHeaderCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{Object.keys(row).map((key) => {
										const initialValue = [...props.data]

										return (
											<TableCell key={key} class="px-6 py-4">
												<EditableCell
													initialValue={
														initialValue[rowIndex][key]
													}
													setEditedRows={setEditedRows}
													rowIndex={rowIndex}
													editedRows={editedRows}
													setData={setData}
													cellKey={key}
												/>
											</TableCell>
										)
									})}
									<TableCell class="px-6 py-4">
										{/* //TODO as vezes da erro e diz que o dado alterado é undefined, parece que é quando clica em um local específico */}
										<Button
											row={rowIndex}
											disabled={!editedRows.includes(rowIndex)}
											variant="form"
											onClick={handleRowChange}
										>
											<Edit2Icon
												oncClick={handleRowChange}
												row={rowIndex}
											></Edit2Icon>
										</Button>
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
