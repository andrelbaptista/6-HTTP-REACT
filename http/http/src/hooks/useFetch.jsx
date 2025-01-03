import { useState, useEffect } from "react";

// custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // refatorando o POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  //   loading
  const [loading, setLoading] = useState(false);

  //   tratando erros
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  //   carregando os dados
  useEffect(() => {
    const fetchData = async () => {
      // tratando o possível erro
      try {
        // loading START
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();

        //   loading END

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados !");
      }

      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  // refatorando o POST
  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        // loading START
        setLoading(true);
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
        //   loading END
        setLoading(false);
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};