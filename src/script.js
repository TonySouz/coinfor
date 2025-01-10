function BTC() {
    fetch('https://api.coinbase.com/v2/prices/BTC-BRL/spot')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            const BTC_BRL = parseFloat(data.data.amount);
            document.getElementById('BTC_BRL').innerText = BTC_BRL.toFixed(2);
        })
        .catch(error => {
            console.error('Houve um problema ao buscar os dados:', error);
        });
}

function ETH() {
    fetch('https://api.coinbase.com/v2/prices/ETH-BRL/spot')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            const ETH_BRL = parseFloat(data.data.amount);
            document.getElementById('ETH_BRL').innerText = ETH_BRL.toFixed(2);
        })
        .catch(error => {
            console.error('Houve um problema ao buscar os dados:', error);
        });
}

function USDC() {
    fetch('https://api.coinbase.com/v2/prices/USDC-BRL/spot')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            const USDC_BRL = parseFloat(data.data.amount);
            document.getElementById('USDC_BRL').innerText = USDC_BRL.toFixed(2);
        })
        .catch(error => {
            console.error('Houve um problema ao buscar os dados:', error);
        });
}

setInterval(BTC, 3000);
setInterval(ETH, 3000);
setInterval(USDC, 3000);

const apiUrl = 'https://cryptopanic.com/api/v1/posts/';

// Função para exibir notícias
function displayNews(news) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    if (news && news.results.length > 0) {
        news.results.forEach(article => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="${article.url}" target="_blank">
                    <h2>${article.title}</h2>
                </a>
                <p>${article.published_at}</p>
                <p>${article.domain}</p>
            `;
            newsList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'Nenhuma notícia encontrada.';
        newsList.appendChild(listItem);
    }
}

// Função para buscar notícias da API
async function getNews() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data);
    } catch (error) {
        console.error('Erro ao obter notícias:', error);
    }
}

// Chama a função para buscar notícias ao carregar a página
window.onload = getNews;