import { TransactionContext } from "@/contexts/TransactionContext";
import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
	const transactions = useContextSelector(TransactionContext, (context) => {
		return context.transactions;
	});

	const summary = useMemo(() => {
		return transactions.reduce(
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
	}, [transactions]);

	return summary;
}
