import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';
import { stripe } from '../../../services/stripe';
export async function saveSubscription(subscriptionId:string,customerId:string){
    console.log("Entrou aqui no saveSubscription",subscriptionId,customerId)

    const userRef = await fauna.query(
        q.Select(
          "stripe_customer_id",
          q.Get(
            q.Match(
              q.Index('user_by_stripe_customer_id'),
              customerId,
            )
          )
        )
      );
    console.log("passou pelo userRef",userRef)

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    
    const subscriptionData = {
        id: subscription.id,
        userId:userRef,
        status:subscription.status,
        price_id: subscription.items.data[0].price.id,
    }
    
    console.log("userRef",subscriptionId)

    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            {data:subscriptionData}
        )
        
    )

}