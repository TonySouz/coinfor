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