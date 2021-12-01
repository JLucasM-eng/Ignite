const express = require('express');

const app = express();

/*
GET - Buscar infos dentro do servidor
POST - Inserir uma info no servidor
PUT - Alterar uma info no servidor
PATCH - Alterar uma info especifica no servidor
DELETE - Deletar uma info no servidor
*/

/*
Tipos de parametros

Route Params => Identificar um recurso, editar ou deletar
    ex(id tal)
Query params => para paginação, etc.. passa no url
Body Params => Objetos que sao passados para inserção ou alteração.
*/

/*app.get('/',(req,res)=>{
    return res.json({status:200})//send mandaria pra tela. Posso mandar um page html
})*/

app.get('/courses',(request, response)=>{
    
    return response.json(["Curso1","Curso2","Curso3"])
})

app.post('/courses',(request, response)=>{
    return response.json(["Curso1","Curso2","Curso3","Curso4"])
})

app.put("/courses/:teste",(req,res)=>{
    const {teste} = req.params
    return res.json([`Curso${teste}`,"Curso2","Curso3","Curso4"])
})

app.delete("/courses/:id",(req,res)=>{
    return res.json(["Curso6","Curso2","Curso4"])
})

app.listen(3333);

