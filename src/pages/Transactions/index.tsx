import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionPage } from "../../components/TransactionPages";
import { SearchForm } from "./components/SearchForm";
import { TransactionsContainer } from "./styles";


export function Transactions() {
	
	
	return (
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />
				
				<TransactionPage />
			</TransactionsContainer>
		</div>
	)
}