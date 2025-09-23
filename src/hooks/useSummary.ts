import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function UseSummary() {
     const { transactions } = useContext(TransactionsContext);


    //Reduce irá reduzir todo o conteudo da variavel transactions para um formato escolhido de income, outcome e total. Podendo assim acessar esses resultados depois
    const summary = transactions.reduce(
        (acc, transaction) => {
            if(transaction.type === 'income') {
                acc.income += transaction.price;
                acc.total += transaction.price;
            } else {
                acc.outcome += transaction.price;
                acc.total -= transaction.price
            }


            return acc
        },

        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )

    return summary
}