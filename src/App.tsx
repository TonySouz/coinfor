import { useEffect, useState } from "react";
import "./styles.css";

// Tipagem das notícias
interface NewsArticle {
  id: string;
  title: string;
  link: string;
  source: string;
  published_at: string;
}

function App() {
  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [usdcPrice, setUsdcPrice] = useState<string | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);

  // Formata preços em BRL
  const formatPrice = (value: number | string): string =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value));

  // Busca preços das criptomoedas
  async function fetchAllPrices() {
    try {
      const [btc, eth, usdc] = await Promise.all([
        fetch("https://api.coinbase.com/v2/prices/BTC-BRL/spot").then((res) => res.json()),
        fetch("https://api.coinbase.com/v2/prices/ETH-BRL/spot").then((res) => res.json()),
        fetch("https://api.coinbase.com/v2/prices/USDC-BRL/spot").then((res) => res.json()),
      ]);

      setBtcPrice(parseFloat(btc.data.amount).toFixed(2));
      setEthPrice(parseFloat(eth.data.amount).toFixed(2));
      setUsdcPrice(parseFloat(usdc.data.amount).toFixed(2));
    } catch (error) {
      console.error("Erro ao buscar preços:", error);
    }
  }

  // Busca notícias usando RSS do CoinDesk via proxy AllOrigins
  async function fetchNews() {
    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const rssUrl = encodeURIComponent("https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml");
      const response = await fetch(`${proxyUrl}${rssUrl}`);
      const data = await response.json();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "application/xml");
      const items = Array.from(xml.querySelectorAll("item")).slice(0, 5); // pega 5 notícias

      const newsData: NewsArticle[] = items.map((item, index) => ({
        id: index.toString(),
        title: item.querySelector("title")?.textContent || "Sem título",
        link: item.querySelector("link")?.textContent || "#",
        source: "CoinDesk",
        published_at: item.querySelector("pubDate")?.textContent || "",
      }));

      setNews(newsData);
    } catch (error) {
      console.error("Erro ao obter notícias:", error);
    }
  }

  useEffect(() => {
    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 10000); // atualiza preços a cada 10s
    return () => clearInterval(interval);
  }, []);

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
            <p>{btcPrice ? formatPrice(btcPrice) : "Carregando..."}</p>
          </li>
          <li>
            <img src="/src/assets/img/eth.png" alt="logo do ethereum" className="imagem" />
            <span>Ethereum (ETH)</span>
            <p>{ethPrice ? formatPrice(ethPrice) : "Carregando..."}</p>
          </li>
          <li>
            <img src="/src/assets/img/usdc.png" alt="logo do usdc coin" className="imagem" />
            <span>USD Coin (USDC)</span>
            <p>{usdcPrice ? formatPrice(usdcPrice) : "Carregando..."}</p>
          </li>
        </ul>

        <h2>Últimas notícias de criptomoedas</h2>
        <ul id="news-list">
          {news.length > 0 ? (
            news.map((article) => (
              <li key={article.id}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <h3>{article.title}</h3>
                </a>
                <p><strong>Fonte:</strong> {article.source}</p>
                <p>
                  <strong>Publicado em:</strong>{" "}
                  {article.published_at
                    ? new Date(article.published_at).toLocaleString("pt-BR")
                    : "Data não disponível"}
                </p>
              </li>
            ))
          ) : (
            <li>Carregando notícias...</li>
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
