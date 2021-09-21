//import {GetServerSideProps} from 'next'
import {GetStaticProps} from 'next'

import styles from './home.module.scss'
import  Head  from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product:{
    priceId:string;
    amount:number;
  }
}

export default function Home({product}:HomeProps) {
    return (
      <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className = {styles.contentContainer}>
        <section className = {styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="girl conding" />
      </main>
      </>
      
    )
  }

  /*export const getServerSideProps:GetServerSideProps = async () => {
    //string dentro do retrieve é a ID DA API em preços lá no meu produto do stripe
    const price = await stripe.prices.retrieve('price_1JcGuZEpb4moL4E5YcehesgY',{
      expand:['product']
    })

    const product = {
      priceId:price.id,
      amount:new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
      }).format(price.unit_amount/100),

    }
    return {
      props:{
        product
      }

    }
  }

  Com o getServerSideProps acima, temos a requisição ao stripe sendo feita
  do lado do servidor next, o que é muito bacana. Porém um problema que pode acontecer
  é de que a nossa pagina seja acessada por exemplo 1 milhao de vezes. Dai o next
  teria que fazer toda essa requisição pra cada acesso, sendo que basicamente nada mudou,
  no nosso caso, por exemplo, o preço vai demorar de mudar.
  Por essa razão podemos usar o getStaticProps, que é a mesma coisa do getServerSideProps,
  porem temos um atributo no return a mais, que é o revalidate, onde passaremos o tempo que
  queremos que o nosso servidor fique servindo aquela pagina html estatica (que ele tem 
    salvo lá). Vamos usar isso. Tambem por isso o fato do getServerSideProps estar comentado.*/
  
    export const getStaticProps:GetStaticProps = async () => {
      //string dentro do retrieve é a ID DA API em preços lá no meu produto do stripe
      const price = await stripe.prices.retrieve('price_1JcGuZEpb4moL4E5YcehesgY',{
        expand:['product']
      })
  
      const product = {
        priceId:price.id,
        amount:new Intl.NumberFormat('en-US',{
          style:'currency',
          currency:'USD'
        }).format(price.unit_amount/100),
  
      }
      return {
        props:{
          product
        },
        revalidate:60*60*24, //24hours
  
      }
    }