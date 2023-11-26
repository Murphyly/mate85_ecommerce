'use client'
import { Search } from 'lucide-react'
// import { useState } from 'react';

export function SearchProduct({ placeholder, filterValue, setFilterValue }) {
	const searchValue = filterValue
	const setSearchValue = setFilterValue

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setSearchValue(e.target.value)
		}
	}

	return (
		<div className="relative w-full">
			<input
				type="text"
				placeholder={placeholder}
				onKeyDown={handleKeyPress}
				className="w-full border rounded-full px-12 py-3 bg-zinc-200 focus:outline-none focus:ring focus:border-blue-300"
			/>
			<div className="absolute inset-y-0 left-4 flex items-center">
				<Search className="text-gray-400" />
			</div>
		</div>
	)
}
