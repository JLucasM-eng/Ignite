
import IncomeImg from '../../assets/Entradas.svg'
import OutcomeImg from '../../assets/Saídas.svg'
import TotalImg from '../../assets/Total.svg'
import { useTransaction } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary(){

    const {transactions} = useTransaction()

    const summary = transactions.reduce((acc,transaction)=>{
        if(transaction.type==='deposit'){
            acc.amount+=transaction.amount
            acc.total+=transaction.amount
        }else{
            acc.withdraws-=transaction.amount
            acc.total-=transaction.amount
            
        }
        return acc
    },{
        amount:0,
        withdraws:0,
        total:0
    })
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="Entradas" />
                </header>
                <strong>
                    {
                    new Intl.NumberFormat('pt-BR', 
                        {
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.amount)
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt="saidas" />
                </header>
                <strong>
                    {
                    new Intl.NumberFormat('pt-BR', 
                        {
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.withdraws)
                    }
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="total" />
                </header>
                <strong>
                    {
                    new Intl.NumberFormat('pt-BR', 
                        {
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    )
}