import * as Dialog from "@radix-ui/react-dialog";
import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "@/contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const createNewTransaction = useContextSelector(
		TransactionContext,
		(context) => {
			return context.createNewTransaction;
		},
	);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			category: "",
			description: "",
			price: 0,
			type: "income",
		},
	});

	async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
		reset();
		await createNewTransaction(data);
	}

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>Nova transação</Dialog.Title>
				<CloseButton>
					<X />
				</CloseButton>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register("description")}
					/>
					<input
						type="number"
						placeholder="Preço"
						required
						{...register("price", { valueAsNumber: true })}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register("category")}
					/>

					<Controller
						control={control}
						name="type"
						render={(props) => {
							return (
								<TransactionType
									value={props.field.value}
									onValueChange={props.field.onChange}
								>
									<TransactionTypeButton value="income" variant="income">
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionTypeButton>

									<TransactionTypeButton value="outcome" variant="outcome">
										<ArrowCircleDown size={24} />
										Saída
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button type="submit" disabled={isSubmitting}>
						Cadastrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
}
