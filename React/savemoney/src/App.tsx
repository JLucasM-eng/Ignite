import React, { useState } from 'react';
import Modal from 'react-modal'
import { Dashboard } from './components/Dashbord';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsContextProvider } from './hooks/useTransactions';

Modal.setAppElement("#root")

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionModalOpen(true)
  }
  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsContextProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}/>

      <GlobalStyle />
    </TransactionsContextProvider>
  );
}


