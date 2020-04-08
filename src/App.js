import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
        // id: "123",
        title: "Desafio ReactJS",
        url: "https://github.com/josepholiveira",
        techs: "React, Node.js",
    }

    await api.post('repositories', repository)

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    const repositoriesIndex = repositories.findIndex(repository=> repository.id===id)

    repositories.splice(repositoriesIndex, 1)

    setRepositories([...repositories])

    await api.delete(`repositories/${id}`)


  }

  return (
    <div>
      <ul>
        {repositories.map(repository => 
        (<li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;