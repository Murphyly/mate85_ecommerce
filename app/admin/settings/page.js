'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { startTransition, useEffect, useState } from 'react'
import { updateSettings } from './actions'
import { getAllOptions } from '@/app/(website)/actionsSettings'
import { Card } from '@tremor/react'

export default function Settings() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [hidePrices, setHidePrices] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		await updateSettings([
			{ key: 'name', value: name },
			{ key: 'email', value: email },
			{ key: 'phone', value: phone },
			{ key: 'hidePrices', value: hidePrices },
		])
	}

	useEffect(() => {
		startTransition(() => {
			const options = getAllOptions().then((res) => {
				res.forEach((el) => {
					switch (el.key) {
						case 'name':
							setName(el.value)
							break
						case 'email':
							setEmail(el.value)
							break
						case 'phone':
							setPhone(el.value)
							break
						case 'hidePrices':
							setHidePrices(el.value)
							break
					}
				})
			})
		})
	}, [])

	return (
		<main className="p-12 w-full">
			<Card>
				<div className="flex justify-center w-full items-center">
					<form
						className="bg-white w-full text-gray-600 rounded-lg h-fit flex flex-col gap-4"
						onSubmit={handleSubmit}
					>
						<h1 className="text-2xl font-bold border-b-zinc-600 border-b">
							Configurações gerais do site
						</h1>
						<div className="grid grid-cols-2 gap-8">
							<div className="w-80">
								<label htmlFor="name">Nome do site</label>
								<Input
									placeholder="Digite o nome do site"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="w-80">
								<label htmlFor="email">E-mail para contato</label>
								<Input
									placeholder="Digite o e-mail para contato"
									id="email"
									value={email}
									type="email"
									pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="w-80">
								<label htmlFor="phone">Telefone para contato</label>
								<Input
									placeholder="Digite o telefone para contato"
									id="phone"
									value={phone}
									type="tel"
									pattern="[0-9]{11}"
									onChange={(e) => setPhone(e.target.value)}
									title="Informe um número de telefone com 11 dígitos numéricos."
									required
								/>
							</div>
							<div className="flex flex-col gap-4 items-start justify-end">
								<label htmlFor="airplane-mode">
									Esconder os preços dos produtos
								</label>
								<Switch
									id="airplane-mode"
									value={hidePrices}
									onChange={(e) => setHidePrices(e.target.value)}
								/>
							</div>
						</div>

						<div className="w-80">
							<label htmlFor="email">E-mail para contato</label>
							<Input
								placeholder="Digite o e-mail para contato"
								id="email"
								value={email}
								type="email"
								pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="w-80">
							<label htmlFor="phone">Telefone para contato</label>
							<Input
								placeholder="Digite o telefone para contato"
								id="phone"
								value={phone}
								type="tel"
								pattern="[0-9]{11}"
								onChange={(e) => setPhone(e.target.value)}
								title="Informe um número de telefone com 11 dígitos numéricos."
								required
							/>
						</div>
						<div className="flex flex-col gap-4 items-start justify-end">
							<label htmlFor="airplane-mode">
								Esconder os preços dos produtos
							</label>
							<Switch
								id="airplane-mode"
								value={hidePrices}
								checked={hidePrices}
								onChange={(e) => setHidePrices(e.target.value)}
							/>
						</div>
						<Button type="submit">Salvar</Button>
					</form>
				</div>
			</Card>
		</main>
	)
}
