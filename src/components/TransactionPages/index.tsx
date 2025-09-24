import { ButtonPage, ButtonPageContainer, PriceHighLight, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { useState } from "react";

export function TransactionPage() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
		return context.transactions
	})

	const itemsPerPage = 6
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(transactions.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentTransactions = transactions.slice(startIndex, endIndex);





    return (
		<div>
			<TransactionsTable>
				<tbody>
					{currentTransactions.map(transaction => {
						return(
							<tr key={transaction.id}>
								<td width="50%">{transaction.description}</td>
								<td>
									<PriceHighLight variant={transaction.type}>
										{transaction.type === 'outcome' && '- ' }
										{priceFormatter.format(transaction.price)}
									</PriceHighLight>
								</td>
								<td>{transaction.category}</td>
								<td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
							</tr>
						)
					})}

				</tbody>
			</TransactionsTable>

			<ButtonPageContainer>
				{Array.from({ length: totalPages }).map((_, index) => {
					const pageNumber = index + 1;
					return(
						<ButtonPage
							key={pageNumber}
							active={currentPage === pageNumber}
							onClick={() => setCurrentPage(pageNumber)}
						>
							{pageNumber}
						</ButtonPage>
					);
				})}
			</ButtonPageContainer>
		</div>
    )
}