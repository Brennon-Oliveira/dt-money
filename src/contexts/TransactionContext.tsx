import { api } from "@/lib/axios";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createContext } from "use-context-selector";

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
	fetchTransactions: (query?: string) => Promise<void>;
	createNewTransaction: (data: CreateNewTransaction) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextData);

interface TransactionProviderProps {
	children: ReactNode;
}

type CreateNewTransaction = {
	description: string;
	price: number;
	category: string;
	type: "income" | "outcome";
};

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const fetchTransactions = useCallback(async (query?: string) => {
		const response = await api.get("transactions", {
			params: {
				q: query,
				_sort: "createdAd",
				_order: "desc",
			},
		});
		setTransactions(response.data);
	}, []);

	const createNewTransaction = useCallback(
		async (data: CreateNewTransaction) => {
			const { category, description, price, type } = data;

			const date = new Date();

			await api.post("transactions", {
				description,
				price,
				category,
				type,
				createdAt: date,
			});
			setTransactions((state) => [
				...state,
				{
					category,
					createdAt: date.toString(),
					description,
					price,
					type,
					id: -1,
				},
			]);

			await fetchTransactions();
		},
		[fetchTransactions],
	);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<TransactionContext.Provider
			value={{ transactions, fetchTransactions, createNewTransaction }}
		>
			{children}
		</TransactionContext.Provider>
	);
}
