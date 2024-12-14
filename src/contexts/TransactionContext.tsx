import { createContext, useEffect, useState, type ReactNode } from "react";

export interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	price: number;
	category: string;
	createdAt: string;
}

interface TransactionContextData {
	transactions: Transaction[];
}

export const TransactionContext = createContext({} as TransactionContextData);

interface TransactionProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/transactions")
			.then((response) => response.json())
			.then((data) => {
				setTransactions(data);
			});
	}, []);

	return (
		<TransactionContext.Provider value={{ transactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
