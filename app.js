const marketNews = [
  {
    title: "Federal Reserve signals steady rates as inflation cools",
    source: "MarketWatch",
    time: "2m ago",
    impact: "Rates outlook stable across Q3."
  },
  {
    title: "Semiconductor rally lifts tech-heavy indexes",
    source: "Bloomberg",
    time: "6m ago",
    impact: "Chipmakers up 3.2% pre-market."
  },
  {
    title: "Energy stocks climb with crude supply constraints",
    source: "Reuters",
    time: "11m ago",
    impact: "Brent crude tops $86 per barrel."
  },
  {
    title: "Retail earnings surprise on resilient consumer demand",
    source: "CNBC",
    time: "16m ago",
    impact: "Guidance raised for FY 2024."
  }
];

const headlineNews = [
  {
    tag: "World",
    text: "Global leaders outline new climate financing commitments ahead of summit."
  },
  {
    tag: "Tech",
    text: "AI chip demand accelerates as cloud providers expand compute clusters."
  },
  {
    tag: "Finance",
    text: "Major banks unveil digital-first savings products with higher yields."
  },
  {
    tag: "Health",
    text: "Researchers announce promising vaccine trial outcomes with broader coverage."
  },
  {
    tag: "Energy",
    text: "Renewables pipeline grows as utilities sign long-term solar contracts."
  }
];

const marketPulse = [
  { label: "S&P 500 Futures", value: "+0.48%", trend: "positive" },
  { label: "NASDAQ 100", value: "+0.63%", trend: "positive" },
  { label: "Dow Futures", value: "-0.12%", trend: "negative" },
  { label: "VIX", value: "-1.4%", trend: "positive" }
];

const sportsScores = [
  {
    league: "NBA",
    status: "Q4 02:16",
    home: "Lakers",
    homeScore: 112,
    away: "Celtics",
    awayScore: 109
  },
  {
    league: "NFL",
    status: "Final",
    home: "49ers",
    homeScore: 27,
    away: "Seahawks",
    awayScore: 24
  },
  {
    league: "MLS",
    status: "FT",
    home: "Inter Miami",
    homeScore: 3,
    away: "Atlanta",
    awayScore: 1
  },
  {
    league: "NHL",
    status: "2nd 09:42",
    home: "Rangers",
    homeScore: 2,
    away: "Maple Leafs",
    awayScore: 2
  }
];

const alerts = [
  "Treasury yields ease after auction demand surprises upside.",
  "Oil volatility watch: OPEC+ meeting scheduled for next week.",
  "Crypto market cap rises 1.8% amid ETF optimism."
];

const tickers = [
  { symbol: "AAPL", price: 214.32, change: 1.12 },
  { symbol: "NVDA", price: 124.88, change: 2.42 },
  { symbol: "TSLA", price: 195.44, change: -0.78 },
  { symbol: "AMZN", price: 189.18, change: 0.64 },
  { symbol: "MSFT", price: 436.02, change: -0.21 },
  { symbol: "META", price: 485.75, change: 1.04 },
  { symbol: "JPM", price: 198.54, change: -0.32 },
  { symbol: "XOM", price: 119.21, change: 0.55 }
];

const marketNewsEl = document.getElementById("marketNews");
const headlineNewsEl = document.getElementById("headlineNews");
const marketPulseEl = document.getElementById("marketPulse");
const sportsScoresEl = document.getElementById("sportsScores");
const alertsEl = document.getElementById("alerts");
const tickerTrackEl = document.getElementById("tickerTrack");
const statusTimeEl = document.getElementById("statusTime");

function renderMarketNews(items) {
  marketNewsEl.innerHTML = items
    .map(
      (item) => `
        <article class="news-card">
          <h3>${item.title}</h3>
          <p>${item.impact}</p>
          <div class="news-meta">
            <span>${item.source}</span>
            <span>${item.time}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderHeadlines(items) {
  headlineNewsEl.innerHTML = items
    .map(
      (item) => `
        <div class="headline-item">
          <span>${item.tag}</span>
          <p>${item.text}</p>
        </div>
      `
    )
    .join("");
}

function renderMarketPulse(items) {
  marketPulseEl.innerHTML = items
    .map(
      (item) => `
        <div class="pulse-row ${item.trend}">
          <strong>${item.label}</strong>
          <span>${item.value}</span>
        </div>
      `
    )
    .join("");
}

function renderScores(items) {
  sportsScoresEl.innerHTML = items
    .map(
      (item) => `
        <div class="score-card">
          <header>
            <span>${item.league}</span>
            <span>${item.status}</span>
          </header>
          <div class="score">
            <span>${item.home}</span>
            <strong>${item.homeScore}</strong>
          </div>
          <div class="score">
            <span>${item.away}</span>
            <strong>${item.awayScore}</strong>
          </div>
        </div>
      `
    )
    .join("");
}

function renderAlerts(items) {
  alertsEl.innerHTML = items.map((alert) => `<div class="alert">${alert}</div>`).join("");
}

function renderTicker(items) {
  const duplicated = [...items, ...items];
  tickerTrackEl.innerHTML = duplicated
    .map((item) => {
      const changeClass = item.change >= 0 ? "positive" : "negative";
      const sign = item.change >= 0 ? "+" : "";
      return `
        <div class="ticker-item">
          <strong>${item.symbol}</strong>
          <span>$${item.price.toFixed(2)}</span>
          <span class="${changeClass}">${sign}${item.change.toFixed(2)}%</span>
        </div>
      `;
    })
    .join("");
}

function updateTime() {
  const now = new Date();
  statusTimeEl.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function randomizeTimes() {
  marketNews.forEach((item) => {
    const minutes = Math.floor(Math.random() * 20) + 1;
    item.time = `${minutes}m ago`;
  });
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function bumpTickerValues() {
  tickers.forEach((ticker) => {
    const change = (Math.random() * 1.2 - 0.6).toFixed(2);
    ticker.change = parseFloat(change);
    ticker.price = Math.max(10, ticker.price + ticker.change);
  });
}

function refreshAll() {
  randomizeTimes();
  renderMarketNews(marketNews);
  renderHeadlines(shuffleArray(headlineNews));
  renderMarketPulse(shuffleArray(marketPulse));
  renderScores(shuffleArray(sportsScores));
  renderAlerts(shuffleArray(alerts));
  bumpTickerValues();
  renderTicker(tickers);
  updateTime();
}

renderMarketNews(marketNews);
renderHeadlines(headlineNews);
renderMarketPulse(marketPulse);
renderScores(sportsScores);
renderAlerts(alerts);
renderTicker(tickers);
updateTime();
setInterval(updateTime, 1000);
setInterval(() => {
  randomizeTimes();
  renderMarketNews(marketNews);
  bumpTickerValues();
  renderTicker(tickers);
}, 8000);

setInterval(() => {
  renderHeadlines(shuffleArray(headlineNews));
  renderScores(shuffleArray(sportsScores));
}, 12000);

setInterval(() => {
  renderAlerts(shuffleArray(alerts));
  renderMarketPulse(shuffleArray(marketPulse));
}, 15000);

const refreshMarketsButton = document.getElementById("refreshMarkets");
const refreshHeadlinesButton = document.getElementById("refreshHeadlines");
const refreshScoresButton = document.getElementById("refreshScores");

refreshMarketsButton.addEventListener("click", () => {
  randomizeTimes();
  renderMarketNews(shuffleArray(marketNews));
});

refreshHeadlinesButton.addEventListener("click", () => {
  renderHeadlines(shuffleArray(headlineNews));
});

refreshScoresButton.addEventListener("click", () => {
  renderScores(shuffleArray(sportsScores));
});

refreshAll();
