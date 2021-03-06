const express = require('express')
const _ = require('lodash')
const { v4:uuidv4 } = require('uuid')//gera um numero handomico

const app = express();

app.use(express.json())

const customers = []
/**
 * A conta vai ter:
 * cpf - string
 * name - string
 * id - uuid universily unique indentify, vamos usar uma lib uuid
 * statement - []
 */


//middleware

function verifyIfExistsAccountCPF(request, response, next){

    const {cpf} = request.headers;

    const customer = customers.find(cust=>cust.cpf === cpf);

    if(!customer){
        return response.status(400).json({"error":"customer Not Found"})
    }

    request.customer = customer

    return next();

}

function getBalance(statement) {

    /*const balance = statement.reduce((acc, operation)=>{
        if(operation.type === 'credit'){
            return acc + operation.amount
        }else {
            return acc - operation.amount;
        }
    },0)*/

    const balanceWithLodash = _.reduce(statement,(acc, operation)=>{
        if(operation.type === 'credit'){
            return acc + operation.amount
        }else {
            return acc - operation.amount;
        }
    },0)

    return balanceWithLodash;
}



app.post("/account",(request,response)=>{
    const { cpf,name } = request.body;
    const customerAlredyExists = customers.some((cust)=>cust.cpf === cpf);
    if(customerAlredyExists){
        return response.status(400).json({"error":"Custumer alredyExist"})
    }
    //vamos armazenar todos os dados num array (bd fake)
    customers.push({
        cpf,
        name,
        id:uuidv4(),
        statement:[]
    })

    response.status(201).send();
    
})

//app.use(verifyIfExistsAccountCPF) se eu quiser que todas as rotas tenham esse middleware

app.get('/statement',verifyIfExistsAccountCPF, (request, response)=>{

    const {customer} = request
    // se fosse pra passar com /statement/:cpf const {cpf} = request.params


    return response.status(200).json(customer.statement)
})

app.post("/deposit",verifyIfExistsAccountCPF,(request,response)=>{
    const {description, amount} = request.body;
    
    const { customer } = request
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type:"credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

app.post("/withdraw",verifyIfExistsAccountCPF,(request,response)=>{
    const {amount} = request.body

    const { customer } = request;

    const balance = getBalance(customer.statement);
    if(balance < amount) {
        return response.status(400).json({error:"Insufficent funds!"})
    }
    const statementOperation = {
        amount,
        created_at: new Date(),
        type:"debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();


})

app.get('/statement/date',verifyIfExistsAccountCPF, (request, response)=>{

    const {customer} = request
    const {date} = request.query;

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter(statement=>{
        statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    })


    return response.status(200).json(statement)
})

app.put("/account",verifyIfExistsAccountCPF,(request,response)=>{
    const { name } = request.body

    const {customer } = request

    customer.name = name

    return response.status(201).send();
})

app.get("/account",verifyIfExistsAccountCPF,(request,response)=>{
    const {customer } = request

    return response.status(201).json(customer);
})

app.delete("/account",(request,response)=>{
    const { customer } = request;

    customers.splice(customer,1)
    return response.status(200).json(customers)
})

app.get("/balance",verifyIfExistsAccountCPF,(request,response)=>{
    const {customer } = request

    const balance = getBalance(customer.statement)
    return response.status(201).json(balance);
})

app.listen(3333);