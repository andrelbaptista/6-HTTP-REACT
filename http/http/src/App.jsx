import { useState, useEffect, useLayoutEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import { use } from "react";

// carregando db json
const url = "http://localhost:3000/products";

function App() {
  // resgatando dados
  const [products, setProducts] = useState([]);

  // carregando os dados SEM custom Hook
  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   getData();
  // }, []);

  // carregando os dados COM custom hook

  // SEM o custom HOOK para o POST
  // const { data:items } = useFetch(url);

  // COM o custom HOOK para o POST
  const { data:items, httpConfig, loading, error } = useFetch(url);

  // enviando dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // enviado os dados a adicionar
  const handleSubmit = async (e) => {
    e.preventDefault;

    const product = {
      name,
      price,
    };

    // COM o custom HOOK para o POST
    httpConfig(product,"POST");

    // SEM o customs hooks para o POST
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(product),
    // });

    // carregamento dinâmico sem gerar nova requisição HTTP
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);
  };

  return (
    <div className="App">
      <h1>HTTP em React</h1>

      {/* imprimindo os dados na tela SEM custom hooks */}
      {/* {products.map((item) => ( */}

      {/* imprimindo os dados na tela COM custom hooks, faz a checagem*/}
      {/* se os dados JA foram carregados para não dar erro por isso items && */}


      {/* SE loading ativado, mensagem de loading */}
      {loading &&  <p>Carregando...</p>}


      {/* tratadondo possíveis erros, pode simular apagando a url */}
      {error && <p>{error}</p>}

      {items && items.map((item) => (

        <ul>
          <li key={item.id}>
            {item.name} - R${item.price}
          </li>
        </ul>
      ))}
      {/* formulário para adicionar dados a serem enviados */}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Produto:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Preço em R$:</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* loading para evitar criar intens antes que a requesição termine e gere duplicidade de dados */}
          {loading && <input type="submit" disable value="Aguarde..." />}
          {!loading && <input type="submit" value="Enviar" />}

          {/* SEM o loading */}
          {/* <input type="submit" value="Criar" /> */}


        </form>
      </div>
    </div>
  );
}

export default App;
