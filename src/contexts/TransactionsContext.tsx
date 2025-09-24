import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from '../../lib/axios'
import { createContext } from "use-context-selector";

interface Transaction {
    id: number;
    description: string;
    type: 'income' |  'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}


interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
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
        const fetchTransactions = useCallback( async(query?: string) => {
            const response = await api.get('transactions', {
                params: {
                    _sort: 'createdAt',
                    _order: 'desc',
                    q: query,
                }
            })
    
            setTransactions(response.data)
            
        }, [])

        const createTransaction = useCallback(async (data: CreateTransactionInput) => {
            const { description, price, category, type } = data

            const response = await api.post('transactions', {
                description,
                price,
                category,
                type,
                createdAt: new Date(),
            })

            setTransactions(state => [response.data ,...state])
            
            }, [],
        )
    
    
      useEffect(() => {
            fetchTransactions();
        }, [fetchTransactions])
    
        
    return(
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            createTransaction,
            
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}