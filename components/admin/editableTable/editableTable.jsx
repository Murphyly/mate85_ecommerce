"use client"
import { Button } from '@/components/ui/button';
import {  useEffect, useState, } from 'react';
import EditableCell from './editableCell';
import { Edit2Icon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function EditableTable(props) {
    const [data, setData] = useState(props.data)
    const [editedRows, setEditedRows] = useState([])

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const handleRowChange = async (e) => {
        const row = e.target.getAttribute("row")
        const res = await props.action(data[row]) //Rever a action passada nas props
        console.log("🚀 ~ file: editableTable.jsx:19 ~ handleRowChange ~ res:", res)
        if (res === true)
            toast.success("Operação realizada com sucesso")
        else
            toast.error("Erro na operação")
    }

    return (
        <table className="w-full text-sm text-center text-zinc-600">
            <thead className="text-xs uppercase bg-neutral-200 text-zinc-900">
                <tr>
                    {props.headers.map((header) => (
                        <th key={header} scope="col" className="px-6 py-3 w-fit">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b bg-white border-neutral-300">
                        {Object.keys(row).map(key => {
                            const initialValue = [...props.data]
                            
                            return (
                                <td key={key} className="px-6 py-4">
                                    <EditableCell
                                        initialValue={initialValue[rowIndex][key]}
                                        setEditedRows={setEditedRows}
                                        rowIndex={rowIndex}
                                        editedRows={editedRows}
                                        setData={setData}
                                        cellKey={key}
                                    />
                                </td>
                            )
                        })}
                        <td className="px-6 py-4">
                            {/* //TODO as vezes da erro e diz que o dado alterado é undefined, parece que é quando clica em um local específico */}
                            <Button
                                row = {rowIndex}
                                disabled={!(editedRows.includes(rowIndex))}
                                variant="form"
                                onClick = {handleRowChange}
                            >   
                                <Edit2Icon onClick = {handleRowChange} row = {rowIndex}></Edit2Icon>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}