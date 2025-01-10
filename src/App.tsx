import React, { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [usdcPrice, setUsdcPrice] = useState(null);
  const [news, setNews] = useState([]);

  // Funções de fetch para criptomoedas
  function fetchBtcPrice() {
    fetch('https://api.coinbase.com/v2/prices/BTC-BRL/spot')
      .then(response => response.json())
      .then(data => setBtcPrice(parseFloat(data.data.amount).toFixed(2)))
      .catch(error => console.error('Houve um problema ao buscar os dados do BTC:', error));
  }

  function fetchEthPrice() {
    fetch('https://api.coinbase.com/v2/prices/ETH-BRL/spot')
      .then(response => response.json())
      .then(data => setEthPrice(parseFloat(data.data.amount).toFixed(2)))
      .catch(error => console.error('Houve um problema ao buscar os dados do ETH:', error));
  }

  function fetchUsdcPrice() {
    fetch('https://api.coinbase.com/v2/prices/USDC-BRL/spot')
      .then(response => response.json())
      .then(data => setUsdcPrice(parseFloat(data.data.amount).toFixed(2)))
      .catch(error => console.error('Houve um problema ao buscar os dados do USDC:', error));
  }

  // Função para buscar notícias
  async function fetchNews() {
    const apiUrl = 'https://cryptopanic.com/api/v1/posts/';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNews(data.results || []);
    } catch (error) {
      console.error('Erro ao obter notícias:', error);
    }
  }

  // Efeitos para chamadas periódicas de preços
  useEffect(() => {
    fetchBtcPrice();
    fetchEthPrice();
    fetchUsdcPrice();

    const interval = setInterval(() => {
      fetchBtcPrice();
      fetchEthPrice();
      fetchUsdcPrice();
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  // Efeito para buscar notícias ao carregar a página
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <header>
        <h1>Coinfor</h1>
        <nav>
          <ul>
            <li><a href="#">Página Inicial</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Produtos</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Criptomoedas</h2>
        <ul className="crypto-list">
          <li className="Bitcoin">
            <img src="/src/assets/img/btc.png" alt="logo do bitcoin" className="imagem" />
            <span>Bitcoin BTC</span>
            <p>{btcPrice ? `R$ ${btcPrice}` : 'Carregando...'}</p>
          </li>
          <li>
            <img src="/src/assets/img/eth.png" alt="logo do ethereum" className="imagem" />
            <span>Ethereum ETH</span>
            <p>{ethPrice ? `R$ ${ethPrice}` : 'Carregando...'}</p>
          </li>
          <li>
            <img src="/src/assets/img/usdc.png" alt="logo do usdc coin" className="imagem" />
            <span>USD Coin USDC</span>
            <p>{usdcPrice ? `R$ ${usdcPrice}` : 'Carregando...'}</p>
          </li>
        </ul>
        <h2>Notícias sobre Criptomoedas</h2>
        <ul id="news-list">
          {news.length > 0 ? (
            news.map(article => (
              <li key={article.id}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h2>{article.title}</h2>
                </a>
                <p>{article.published_at}</p>
                <p>{article.domain}</p>
              </li>
            ))
          ) : (
            <li>Nenhuma notícia encontrada.</li>
          )}
        </ul>
      </main>
      <footer>
        <p>&copy; 2024 Coinfor. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;