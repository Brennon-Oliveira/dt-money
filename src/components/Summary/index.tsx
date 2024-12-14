import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "@/contexts/TransactionContext";

export function Summary() {
	const { transactions } = useContext(TransactionContext);

	const summary = transactions.reduce(
		(acc, current) => {
			if (current.type === "income") {
				acc.income += current.price;
				acc.total += current.price;
			} else {
				acc.outcome += current.price;
				acc.total -= current.price;
			}

			return acc;
		},
		{
			income: 0,
			outcome: 0,
			total: 0,
		},
	);

	return (
		<SummaryContainer>
			<SummaryCard>
				<header>
					<span>Entradas</span>
					<ArrowCircleUp size={32} color="#00b37e" />
				</header>

				<strong>{summary.income}</strong>
			</SummaryCard>
			<SummaryCard>
				<header>
					<span>Saídas</span>
					<ArrowCircleDown size={32} color="#f75a68" />
				</header>

				<strong>{summary.outcome}</strong>
			</SummaryCard>
			<SummaryCard variant="green">
				<header>
					<span>Total</span>
					<CurrencyDollar size={32} color="#fff" />
				</header>

				<strong>{summary.total}</strong>
			</SummaryCard>
		</SummaryContainer>
	);
}