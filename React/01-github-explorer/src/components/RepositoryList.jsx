import { useEffect, useState } from "react"
import { RepositoryItem } from "./RepositoryItem"

export function RepositoryList(){
    
    const [repositories,setRepositories]=useState([])

    useEffect(()=>{
        fetch("https://api.github.com/users/adriacaroba/repos")
            .then(response =>response.json())
            .then(data=>setRepositories(data))
    },[])

    console.log(repositories)
    return(
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                {repositories.map((repository)=>{
                    return <RepositoryItem key={repository.id} repository={repository}/>
                
                })}
                
            </ul>
        </section>
    )
}