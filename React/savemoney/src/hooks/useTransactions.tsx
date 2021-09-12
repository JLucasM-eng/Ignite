import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface Transaction {
    id:number,
    title:string,
    amount:number,
    category:string,
    createdAt:string,
    type:string
}

interface TransactionsContextProviderProps {
    children:ReactNode
}

type TransactionInput = Omit<Transaction,"id" | "createdAt">

interface TransactionContextData {
    transactions:Transaction[],
    createTransaction:(transaction:TransactionInput)=>Promise<void>
}

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);


export function TransactionsContextProvider({children}:TransactionsContextProviderProps){

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {

        api.get("transactions")
            .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput:TransactionInput){
        
        const response = await api.post('/transactions',{...transactionInput,createdAt:new Date()})
        setTransactions([
            ...transactions,
            response.data.transaction
        ])
    }

    return(
        <TransactionsContext.Provider value = {{transactions,createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
} 


export function useTransaction(){
    const context = useContext(TransactionsContext)
    return context
}