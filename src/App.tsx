import { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [usdcPrice, setUsdcPrice] = useState(null);
  const [news, setNews] = useState([]);

  // 🔹 Função para formatar o preço em BRL
  const formatPrice = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  // 🔹 Busca todas as criptomoedas de uma vez
  async function fetchAllPrices() {
    try {
      const [btc, eth, usdc] = await Promise.all([
        fetch('https://api.coinbase.com/v2/prices/BTC-BRL/spot').then((res) => res.json()),
        fetch('https://api.coinbase.com/v2/prices/ETH-BRL/spot').then((res) => res.json()),
        fetch('https://api.coinbase.com/v2/prices/USDC-BRL/spot').then((res) => res.json()),
      ]);

      setBtcPrice(parseFloat(btc.data.amount).toFixed(2));
      setEthPrice(parseFloat(eth.data.amount).toFixed(2));
      setUsdcPrice(parseFloat(usdc.data.amount).toFixed(2));
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
    }
  }

  // 🔹 Busca notícias usando a key pública (demo)
  async function fetchNews() {
    const apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=demo&public=true';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNews(data.results || []);
    } catch (error) {
      console.error('Erro ao obter notícias:', error);
    }
  }

  // 🔹 Atualiza os preços periodicamente
  useEffect(() => {
    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 10000); // atualiza a cada 10s
    return () => clearInterval(interval);
  }, []);

  // 🔹 Busca notícias ao carregar
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
            <span>Bitcoin (BTC)</span>
            <p>{btcPrice ? formatPrice(btcPrice) : 'Carregando...'}</p>
          </li>
          <li>
            <img src="/src/assets/img/eth.png" alt="logo do ethereum" className="imagem" />
            <span>Ethereum (ETH)</span>
            <p>{ethPrice ? formatPrice(ethPrice) : 'Carregando...'}</p>
          </li>
          <li>
            <img src="/src/assets/img/usdc.png" alt="logo do usdc coin" className="imagem" />
            <span>USD Coin (USDC)</span>
            <p>{usdcPrice ? formatPrice(usdcPrice) : 'Carregando...'}</p>
          </li>
        </ul>

        <h2>Notícias sobre Criptomoedas</h2>
        <ul id="news-list">
          {news.length > 0 ? (
            news.map((article) => (
              <li key={article.id}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h3>{article.title || 'Notícia sem título'}</h3>
                </a>
                <p><strong>Fonte:</strong> {article.domain}</p>
                <p>
                  <strong>Publicado em:</strong>{' '}
                  {article.published_at
                    ? new Date(article.published_at).toLocaleString('pt-BR')
                    : 'Data não disponível'}
                </p>
              </li>
            ))
          ) : (
            <li>Nenhuma notícia encontrada.</li>
          )}
        </ul>
      </main>

      <footer>
        <p>&copy; 2025 Coinfor. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
