import { updateProductCategory, queryAllProductCategories } from './add/action'
import EditableTable from '@/components/admin/editableTable/editableTable'

export default async function AddEditCategories({ params }) {
	const productCategories = await queryAllProductCategories(params.id)

	const headers = ['Id', 'Categoria', 'Editar']

	const fields = [
		{
			name: 'categoryName',
			label: 'Categoria',
			type: 'text',
		},
	]

	return (
		<EditableTable
			title="Sub-produtos"
			headers={headers}
			data={productCategories}
			action={updateProductCategory}
		/>
	)
}
