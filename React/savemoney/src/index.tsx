import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs'
import {App} from './App';

/*UTILIZANDO UMA API FAKE COM O MIRAGE JS*/
/*Instalando a lib (yarn add miragejs; 
  importar o createServer;
  Utilizar da forma como está abaixo.
  
  O parametro models é para iniciarmos o bd interno
  do mirage js.
  Quando criamos a rota para o post, temos que mandar as 
  informações inceridas para o bd e acessar essas infos 
  na rota get que criamos, por isso fazemos dessa forma.
  
  Sempre o bd vai inicar vazio. Então vamos deixar alguns
  dados precadastrados para a interface ficar mais amigavel
  utilizando o seeds(server).*/
createServer({

  models:{
    transaction:Model
  },

  seeds(server){
    server.db.loadData({
      transactions:[//sempre o noma da tabela no plural, se a nossa tabela (model) se chama transaction...
        {
          id:1,//sempre tem que existir um id numerico auto incremental
          title:"Freelance de website",
          type:'deposit',
          category:'Dev',
          amount:6000,
          createdAt:new Date('2021-02-12 09:00:00'),
        },
        {
          id:2,//sempre tem que existir um id numerico auto incremental
          title:"Aluguel",
          type:'withdraw',
          category:'Casa',
          amount:1100,
          createdAt:new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';
    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })

    this.post('/transactions',(schema,request)=>{
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction',data)//transaction é o model
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

