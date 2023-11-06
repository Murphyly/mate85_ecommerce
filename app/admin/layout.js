import AdminNavbar from '@/components/admin/navbar'
import './admin.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'ShopIC',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className + ' min-h-screen flex flex-col'}>
				<div className="flex flex-row flex-grow bg-neutral-100">
					<AdminNavbar></AdminNavbar>
					<div className="p-4 w-full">{children}</div>
				</div>
			</body>
		</html>
	)
}
