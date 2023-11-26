'use server'
import { prisma } from '@/utils/prisma'
import {
	removeProductCategory,
	updateProductCategory,
	queryAllProductCategories,
} from '../../add/action'
import { AdminForm } from '@/components/admin/adminForm'
import EditableTable from '@/components/admin/editableTable/editableTable'

export default async function AddEditCategories({ params }) {
	const productCategories = await queryAllProductCategories(params.id)

	const headers = ['Id', 'Categoria', 'Ação']

	const actions = [
		{
			name: 'Edit',
			color: 'blue',
			dest: '/admin/products/categories/$1/edit',
		},
	]

	const fields = [
		{
			name: 'categoryName',
			label: 'Categoria',
			type: 'text',
		},
	]

	return (
		<div className="max-w-[70%] overflow-x-auto flex flex-wrap justify-center mx-auto">
			<h3 className="text-2xl w-full font-bold border-b-zinc-600 border-b text-zinc-900 mb-6">
				Categorias
			</h3>
			<EditableTable
				title="Sub-produtos"
				headers={headers}
				data={productCategories}
				action={actions}
			/>
		</div>
	)
}
