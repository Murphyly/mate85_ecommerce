'use client'

import { Button } from '@/components/ui/button'
import { prisma } from '@/utils/prisma'
import { Card } from '@tremor/react'
import { EditIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export function AdminForm(props) {
	const [isClientSide, setIsClientSide] = useState(false)

	useEffect(() => {
		setIsClientSide(true)
	}, []) // Este efeito será executado apenas no lado do cliente
	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formValues = {}

		formData.forEach((value, key) => {
			formValues[key] = value
		})
		if (props.onSubmit) {
			props.onSubmit(formValues)
		} else {
			props.action(formData)
		}
	}

	return (
		<main className="p-12 w-full">
			<Card>
				<div className="flex flex-col justify-center w-full items-center gap-4">
					<h1 className="text-2xl font-bold border-b-zinc-600 border-b flex flex-nowrap w-full">
						<EditIcon /> {props.formTitle}
					</h1>

					<form
						action={props.action}
						onSubmit={handleSubmit}
						className="w-full flex flex-col gap-8"
					>
						{props.fields.map((field) => {
							return (
								// eslint-disable-next-line react/jsx-key
								<div>
									<label className="block mb-2" htmlFor="name">
										{field.label}
									</label>

									{field.type == 'select' ? (
										<select
											name={field.name}
											value={field.value}
											className="bg-gray-800 text-white rounded-md w-full"
										>
											{field.options.map((item) => (
												// eslint-disable-next-line react/jsx-key
												<option value={item.id}>{item.name}</option>
											))}
										</select>
									) : field.type === 'textarea' ? (
										<textarea
											className="bg-neutral-300 text-black rounded-md w-full"
											value={field.value}
											name={field.name}
											rows={4}
											cols={40}
										/>
									) : (
										<input
											type={field.type}
											name={field.name}
											value={field.value}
											placeholder={field.placeholder}
											className="bg-neutral-300 text-black p-2 rounded-md w-full"
										/>
										//TODO arrumar value hidden para atualização e mostrar value no editform
									)}
								</div>
							)
						})}

						<Button
							className="text-white"
							variant="form"
							size="lg"
						>
							{props.buttonLabel}
						</Button>
					</form>
				</div>
			</Card>
		</main>
	)
}
