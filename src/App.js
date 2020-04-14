import React,{useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data)
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post('/repositories',{
        "title":"React in Web",
        "url":"https://github.com/go-stack-jonathancsr/conceitos-nodejs",
        "techs":[
          "Node",
          "Js"
        ]
      }
    )

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    
    const repoIndex = repositories.findIndex(repo => repo.id === id);

    setRepositories([...repositories.filter(repo => repo.id !== id)]);   

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return(
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
              </button>
          </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
