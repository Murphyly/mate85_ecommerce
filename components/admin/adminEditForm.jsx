import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export default function EditProductForm() {
	const [inputVal, setInputVal] = useState('')

	return (
		<div className="bg-slate-100 p-8 mt-5 mb-3 text-gray-600 border-solid rounded-lg h-fit w-fit">
			<h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b flex flex-nowrap">
				<EditIcon className="mx-2" /> {props.formTitle}
			</h1>
			<form action={props.action}>
				{props.fields.map((field) => {
					return (
						// eslint-disable-next-line react/jsx-key
						<div className="m-4">
							<label className="block mb-2" htmlFor="name">
								{field.label}
							</label>

							{field.type == 'select' ? (
								<select
									name={field.name}
									className="bg-gray-800 text-white p-2 rounded-md w-full"
								>
									{categorias.map((item) => (
										// eslint-disable-next-line react/jsx-key
										<option value={item.id}>{item.name}</option>
									))}
								</select>
							) : (
								<input
									type={field.type}
									name={field.name}
									value={field.value}
									onChange={(e) => console.log(e.target.value)}
									className="bg-neutral-300 text-black p-2 rounded-md w-full"
								/>
							)}
						</div>
					)
				})}

				<Button className="ml-5 mt-3 text-white" variant="form" size="lg">
					{props.buttonLabel}
				</Button>
			</form>
		</div>
	)
}
