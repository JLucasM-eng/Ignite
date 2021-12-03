const express = require('express')
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

app.get('/statement',(request, response)=>{
    // se fosse pra passar com /statement/:cpf const {cpf} = request.params

    const {cpf} = request.headers;

    const customer = customers.find(cust=>cust.cpf === cpf);

    if(!customer){
        return response.status(400).json({"error":"customer Not Found"})
    }
    return response.status(200).json(customer.statement)
})

app.listen(3333);