# Coinfor

Coinfor é um **dashboard de criptomoedas** que exibe os preços de Bitcoin (BTC), Ethereum (ETH) e USD Coin (USDC) em **BRL**, além de apresentar as **últimas notícias de criptomoedas**. O projeto foi feito com **React + TypeScript** e utiliza APIs públicas sem necessidade de chave.

---

## 🚀 Funcionalidades

* Exibe preços atualizados de BTC, ETH e USDC em tempo real.
* Formatação automática de preços em **Reais (BRL)**.
* Mostra as **5 últimas notícias de criptomoedas**.
* Notícias obtidas via RSS do **CoinDesk** usando um proxy público para contornar CORS.
* Layout simples e responsivo com cabeçalho, lista de criptomoedas, notícias e rodapé.

---

## 🛠 Tecnologias utilizadas

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Coinbase API](https://developers.coinbase.com/api/v2#prices) - para preços das criptomoedas
* [CoinDesk RSS](https://www.coindesk.com/arc/outboundfeeds/rss/) - para notícias de cripto
* [AllOrigins](https://allorigins.win/) - proxy público para contornar restrição CORS
* CSS para estilo simples (arquivo `styles.css`)

---

## 📦 Estrutura do projeto

```
coinfor/
│
├─ src/
│  ├─ assets/
│  │  └─ img/
│  │     ├─ btc.png
│  │     ├─ eth.png
│  │     └─ usdc.png
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
│
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## 💻 Pré-requisitos

* Node.js >= 18
* npm ou yarn

---

## ⚡ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/TonySouz/coinfor.git
```

2. Acesse a pasta do projeto:

```bash
cd coinfor
```

3. Instale as dependências:

```bash
npm install
# ou
yarn
```

---

## ▶️ Executar o projeto

```bash
npm run dev
# ou
yarn dev
```

Depois, abra o navegador em: `http://localhost:5173` (porta padrão do Vite).

---

## 📝 Sobre as APIs

### Coinbase API

* URL usada: `https://api.coinbase.com/v2/prices/{CRYPTO}-BRL/spot`
* Não requer autenticação para preços públicos.
* Retorna o valor da criptomoeda em BRL.

### CoinDesk RSS

* URL usada: `https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml`
* Convertido para JSON usando **AllOrigins** para contornar o CORS.
* Limitado a **5 últimas notícias** para exibição.

---

## 🎨 Estilo

O projeto utiliza CSS simples em `styles.css`:

* Lista horizontal de criptomoedas com imagens.
* Notícias listadas verticalmente.
* Cabeçalho com navegação e rodapé fixo.
* Formatação de preços em BRL usando `Intl.NumberFormat`.

---

## 🔧 Possíveis melhorias

* Adicionar **mais criptomoedas**.
* Adicionar **gráficos de preços históricos**.
* Melhorar **responsividade e layout**.
* Adicionar **tradução automática das notícias**.
* Criar **tema escuro/claro**.

---

## 📄 Licença

Este projeto é open-source e livre para uso pessoal ou educacional.
