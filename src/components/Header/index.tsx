import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoSvg from "@assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";
import { memo } from "react";

function HeaderComponent() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoSvg} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova transação</NewTransactionButton>
					</Dialog.Trigger>
					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}

export const Header = memo(HeaderComponent);
