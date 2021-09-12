import CloseImg from '../../assets/Vector (1).svg'
import IncomeImg from '../../assets/Entradas.svg'
import OutcomeImg from '../../assets/Saídas.svg'
import Modal from 'react-modal'
import { Container,RadioBox,TransactionsTypeContainer } from './styles'
import { FormEvent, useContext, useState } from 'react'
import { useTransaction } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
    isOpen:boolean,
    onRequestClose:()=>void
}

export function NewTransactionModal({isOpen,onRequestClose}:NewTransactionModalProps){

    const {createTransaction} = useTransaction()

    const [type,setType]=useState('deposit')
    const [title,setTitle]=useState('')
    const [amount,setAmount]=useState(0)
    const [category,setCategory]=useState('')

    const handleCreateNewTransaction = async (event:FormEvent)=>{
        event.preventDefault()
        await createTransaction({
            amount,
            title,
            category,
            type
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()

        
    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        /*As classes acima são uma possibilidade que o 
        modal nos dá de estilizar o modal, tanto a parte externa
        (overlay) quanto o conteudo. Como a estilização dos modais
        são algo muito gerais, vamos fazer a estilização no globalStyle*/
      >
        
        <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close">
            <img src={CloseImg} alt="fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>

            <input 
                placeholder="Título" 
                value = {title}
                onChange={event =>setTitle(event.target.value)}  
            />

            <input 
                placeholder="Valor" 
                type="number"
                value = {amount}
                onChange={event =>setAmount(Number(event.target.value))}
             />
            <TransactionsTypeContainer>
                <RadioBox
                    type="button"
                    onClick={()=>setType('deposit')}
                    isActive={type==='deposit'}
                    activeColor="green"
                >
                    <img src={IncomeImg} alt="entrada" />
                    <span>Entradas</span>

                </RadioBox>

                <RadioBox
                    type="button"
                    onClick={()=>setType('withdraw')}
                    isActive={type==='withdraw'}
                    activeColor="red"
                >
                    <img src={OutcomeImg} alt="saidas" />
                    <span>Saídas</span>
                </RadioBox>
            </TransactionsTypeContainer>

            <input 
                placeholder="Categoria" 
                value = {category}
                onChange={event =>setCategory(event.target.value)} 
            />

            <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    )
}