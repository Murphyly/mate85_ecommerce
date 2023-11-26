'use client'

import { getContactDB, getNameDB } from '@/app/(website)/actionsSettings'
import { Facebook, Github, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Footer() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	async function getContact() {
		const response = await getContactDB()

		if(response.length > 0){
			
			setName(response[0].name)
			setEmail(response[1].email)
		}
		
	}

	useEffect(() => {
		getContact()
	}, [])

	return (
		<footer className="bg-zinc-100 py-20 w-full px-8">
			<div className="max-w-7xl mx-auto flex justify-between">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-6">
						<h2 className="text-3xl font-black">
							{name ? name : 'SHOPIC'}
						</h2>
						<div className="flex flex-col gap-4">
							<p className="max-w-[248px] text-sm text-zinc-600">
								Temos roupas que se adequam ao seu estilo e das quais
								você se orgulha de usar. Tanto para mulheres quanto para
								homens.
							</p>
							<p className="max-w-[248px] text-sm text-zinc-600">
								{email ? email : 'contato@shopic.com.br'}
							</p>
						</div>
					</div>
					<div className="flex gap-4">
						<Twitter
							className="border border-zinc-200 text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white duration-300"
							size={36}
						/>
						<Facebook
							className="border border-zinc-200 text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white duration-300"
							size={36}
						/>
						<Instagram
							className="border border-zinc-200 text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white duration-300"
							size={36}
						/>
						<Github
							className="border border-zinc-200 text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white duration-300"
							size={36}
						/>
					</div>
				</div>

				<FooterColumn
					title="Empresa"
					links={[
						{ name: 'Sobre', url: '/' },
						{ name: 'Recurso', url: '/' },
						{ name: 'Coleção', url: '/' },
						{ name: 'Carreira', url: '/' },
					]}
				/>
				<FooterColumn
					title="Ajuda"
					links={[
						{ name: 'Atendimento ao Cliente', url: '/' },
						{ name: 'Detalhes da Entrega', url: '/' },
						{ name: 'Termos & Condições', url: '/' },
						{ name: 'Política de Privacidade', url: '/' },
					]}
				/>
				<FooterColumn
					title="FAQ"
					links={[
						{ name: 'Conta', url: '/' },
						{ name: 'Gerenciar Entregas', url: '/' },
						{ name: 'Pedidos', url: '/' },
						{ name: 'Pagamentos', url: '/' },
					]}
				/>

				<FooterColumn
					title="Recursos"
					links={[
						{ name: 'eBooks Gratuitos', url: '/' },
						{ name: 'Tutorial de Desenvolvimento', url: '/' },
						{ name: 'Como fazer - Blog', url: '/' },
						{ name: 'Lista de Reprodução', url: '/' },
					]}
				/>
			</div>
		</footer>
	)
}

function FooterColumn({ title, links }) {
	return (
		<div className="flex flex-col gap-6">
			<h3 className="font-medium uppercase">{title}</h3>
			<ul className="text-zinc-600 flex flex-col gap-4">
				{links.map((link) => (
					<li
						key={link.name}
						className="hover:opacity-60 transition-opacity"
					>
						<Link href={link.url}>{link.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
