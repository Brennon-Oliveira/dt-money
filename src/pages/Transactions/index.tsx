import { Header } from "@/components/Header";
import { Summary } from "@/components/Summary";
import {
	PriceHighlight,
	TransactionsContainer,
	TransactionsTable,
} from "./styles";
import { SearchForm } from "./SearchForm";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/contexts/TransactionContext";

export function Transactions() {
	const { transactions } = useContext(TransactionContext);

	return (
		<div>
			<Header />
			<Summary />
			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td width="50%">{transaction.description}</td>
								<td>
									<PriceHighlight variant={transaction.type}>
										{transaction.price}
									</PriceHighlight>
								</td>
								<td>{transaction.category}</td>
								<td>{transaction.createdAt}</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
