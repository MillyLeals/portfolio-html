const grid = document.getElementById('crypto-grid');
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

async function fetchCryptoData() {
    try {
        const response = await fetch(url);
        const data = await response.json(); //convertendo dados para json
        renderCards(data); //enviando os dados recebidos (for cards)

    } catch (error) {
        console.log(error);
        grid.innerHTML = '<p>Erro ao carregar as criptomoedas.</p>';
    }
}

function renderCards(coins) {
    grid.innerHTML = '';
    coins.forEach(coin => {
        const change = coin.price_change_percentage_24h; //variação percentual das últimas 24 horas
        const cardBgColor = change >= 0  //se subir fundo cinza mais claro, se descer fundo quase preto
            ? 'bg-[#333333]' 
            : 'bg-[#0a0a0a]';

        const percentageColor = change >= 0 
            ? 'text-white' 
            : 'text-[#888888]';

        const card = `
            <div class="${cardBgColor} text-[#BDBDBD] p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-white/10">
                <img src="${coin.image}" alt="${coin.name}" class="w-14 h-14 mb-4 rounded-full bg-white/10 p-1">
                <h2 class="text-xl font-black uppercase tracking-widest">${coin.symbol.toUpperCase()}</h2>
                <p class="text-xs opacity-70 mb-3">${coin.name}</p>
                <p class="text-2xl font-bold">$${coin.current_price}</p>
                <p class="text-sm font-semibold mt-2 flex items-center gap-1 ${percentageColor}">
                    ${change >= 0 ? '▲' : '▼'}
                    ${Math.abs(change).toFixed(2)}% 
                </p>
            </div>
        `;
        grid.innerHTML += card;
    });
}
fetchCryptoData();