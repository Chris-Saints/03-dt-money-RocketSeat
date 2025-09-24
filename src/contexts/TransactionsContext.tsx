import { createContext, useEffect, useState, type ReactNode } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' |  'outcome';
    price: number;
    category: string;
    createdAt: string;
}


interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}




// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionContextType); //Sera essa const que guardará os dados e poderá ser importada para outros children para terem acesso a informação



//TransactionsProvider irá ter toda a informação e irá distribuir ela para todos os componentes filhos, para que eles tenham acesso. Por isso irá envolver o componente Transactions no App
export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]); //Onde ficará gravado todos os dados das transações.
    
    
        //Uma função assincrona para recuperar os dados que estão na back-end e transforma-los em uma variavel. Depois adicionar eles ao useState que guarda as informações das transações
        async function fetchTransactions(query?: string) {
            const url = new URL('http://localhost:3000/transactions');

            if(query) {
                url.searchParams.append('q', query);
            }

            const response = await fetch(url)
            const data = await response.json();
    
            setTransactions(data)
            
        }
    
    
      useEffect(() => {
            fetchTransactions();
        }, [])
    
        
    return(
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}