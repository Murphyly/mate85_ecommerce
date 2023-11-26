'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToggleGroup } from './toggleGroup'
import { useCart } from '@/components/CartContext'
import { toast } from 'react-toastify'

export default function Filtros({ produto }) {
	const [sku, setSku] = useState()
	const [price, setPrice] = useState()
    const [enable, setEnable] = useState()
	const [stock, setStock] = useState(1)
	const router = useRouter()

	useEffect(() => {
		for (let i = 0; i < produto.product_item.length; i++) {
			if (produto.product_item[i].sku == sku) {
				setPrice(produto.product_item[i].price)
				setStock(produto.product_item[i].amount)
				setQty(Math.min(qty, produto.product_item[i].amount))
			}
		}
	}, [sku])

	const { addToCart } = useCart()
	function handleClick() {
		if (!sku) toast.error('Selecione um tamanho primeiro')
		else addToCart(sku, produto, qty)
	}

	function handleClick2() {
		if (!sku) toast.error('Selecione um tamanho primeiro')
		else  {
			addToCart(sku, produto, qty)
			router.push('/cart')
		}
	}

	const [qty, setQty] = useState(1)

	function addQty() {
		setQty(Math.min(qty + 1, stock))
	}

	function decQty() {
		if (qty !== 0) {
			setQty(qty - 1)
		}
	}

	return (
		<>
			<div className="flex flex-col gap-4">
				<h3>Escolha o tamanho</h3>
				<ToggleGroup.Root
					value={sku}
					onChange={setSku}
					className="flex gap-4"
				>
					{produto.product_item.map((item, index) => {
						return (
							<ToggleGroup.Button
								key={item.sku}
								value={item.sku}
                                onClick={() => setEnable(item.amount < 1)}
								className="px-6 rounded-full"
							>
								{item.size}
							</ToggleGroup.Button>
						)
					})}
				</ToggleGroup.Root>
			</div>
			{price && (
				<><span className="text-2xl">
					Preço: R${(price * qty).toFixed(2)}
				</span>
				<span className='text-xs'>Estoque: {stock > 0 ? stock : "indisponível"} {stock > 1? "unidades disponíveis" : (stock  == 1 ? "unidade disponível" : "")}</span>
				</>
			)}
			<hr className="my-4"></hr>
			<div className="flex flex-row text-black gap-4">
				<div className="text-xl flex items-center">
					<button
						onClick={decQty}
						className="bg-zinc-300 px-4 py-2 rounded-l-full"
					>
						-
					</button>
					<input
						className="bg-zinc-300 px-4 py-2 text-center remove-arrow w-20"
						type="number"
						disabled
						value={qty}
					></input>
					<button
						onClick={addQty}
						className="bg-zinc-300 px-4 py-2 rounded-r-full"
					>
						+
					</button>
				</div>
				<button onClick={handleClick} disabled={enable ? true : false} className="border-2 border-black bg-black text-white rounded-full hover:bg-transparent hover:text-black duration-300 w-auto flex-grow py-2 px-8 disabled:text-black disabled:border-zinc-300 disabled:bg-zinc-300">
                    {enable && (
                        <>
                            Indisponível
                        </>
                    )}
                    {!enable && (
                        <>
                           Adicionar ao carrinho
                        </>
                    )}
                    
                </button>
				<button onClick={handleClick2} disabled={enable ? true : false} className="border-2 border-black bg-black text-white rounded-full hover:bg-transparent hover:text-black duration-300 w-auto py-2 px-8 disabled:text-black disabled:border-zinc-300 disabled:bg-zinc-300">
                    {enable && (
                        <>
                            Indisponível
                        </>
                    )}
                    {!enable && (
                        <>
                           Comprar
                        </>
                    )}
                    
                </button>
			</div>
		</>
	)
}
