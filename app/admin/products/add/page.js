'use server'
import { prisma } from '@/utils/prisma'
import { createProduct } from '../actions'
import { AdminForm } from '@/components/admin/adminForm'

export default async function AddProduct() {
	const fieldsProduct = [
		{
			name: 'productName',
			label: 'Nome do Produto',
			type: 'text',
		},
		{
			name: 'description',
			label: 'Descrição',
			type: 'textarea',
		},
		{
			name: 'category',
			label: 'Categorias',
			type: 'select',
			options: [],
		},
	]

	const categorias = (await prisma.ProductCategory.findMany()).forEach(
		(categoria) => {
			fieldsProduct[2].options.push({
				id: categoria.id,
				name: categoria.name,
			})
		}
	)

	return (
		<AdminForm
			formTitle="Adicionar Produto"
			action={createProduct}
			fields={fieldsProduct}
			buttonLabel="Adicionar"
		/>
	)
}
