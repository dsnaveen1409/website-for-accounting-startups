const marketStories = [
  {
    title: "Tech rally accelerates as chipmakers post record demand",
    summary: "Semiconductor leaders climb after new AI infrastructure orders lift sector forecasts across the Nasdaq.",
    source: "MarketPulse",
    time: "Just now",
  },
  {
    title: "Oil retreats as supply chain pressures ease",
    summary: "Energy traders respond to fresh shipping data, sending WTI down 1.2% while refiners stabilize.",
    source: "EnergyWatch",
    time: "2 min ago",
  },
  {
    title: "Banking shares edge higher on bond yield rebound",
    summary: "Yield curves steepen slightly, supporting financials and sparking a renewed rotation into value.",
    source: "Capital Desk",
    time: "5 min ago",
  },
  {
    title: "Retail sales beat expectations heading into earnings week",
    summary: "Strong discretionary spending pushes consumer indices higher and updates revenue outlooks.",
    source: "Retail Insights",
    time: "8 min ago",
  },
];

const headlineStories = [
  {
    title: "Global leaders outline new climate resilience commitments",
    summary: "A coalition of 40 cities announces infrastructure funding for flood resilience and clean transit.",
    source: "World Brief",
  },
  {
    title: "Health agencies expand telehealth coverage for 2024",
    summary: "New policy guidance increases remote care reimbursements across rural communities.",
    source: "Healthline Daily",
  },
  {
    title: "Space agencies confirm joint lunar research initiative",
    summary: "An international team will share data and coordinate for a 2027 crewed mission.",
    source: "Orbital News",
  },
  {
    title: "Education platforms report record remote enrollments",
    summary: "Demand for professional certificates continues to outpace on-campus growth.",
    source: "Campus Report",
  },
];

const sportsScores = [
  {
    league: "NBA",
    matchup: "Harbor City vs. Metro Stars",
    score: "102 - 98",
    status: "Q4 · 02:18",
  },
  {
    league: "MLB",
    matchup: "Lakeside vs. Capital",
    score: "4 - 3",
    status: "Bottom 8th",
  },
  {
    league: "MLS",
    matchup: "Union FC vs. Gold Coast",
    score: "2 - 1",
    status: "67'",
  },
  {
    league: "NHL",
    matchup: "North Bay vs. River City",
    score: "3 - 3",
    status: "OT",
  },
];

const tickerSymbols = [
  { symbol: "AAPL", price: 189.32, change: 1.3 },
  { symbol: "MSFT", price: 412.88, change: -0.6 },
  { symbol: "NVDA", price: 905.14, change: 2.1 },
  { symbol: "AMZN", price: 181.75, change: 0.4 },
  { symbol: "TSLA", price: 178.22, change: -1.4 },
  { symbol: "GOOG", price: 152.66, change: 0.9 },
  { symbol: "META", price: 488.21, change: 1.8 },
  { symbol: "JPM", price: 198.05, change: -0.3 },
  { symbol: "XOM", price: 116.42, change: 0.7 },
  { symbol: "SPY", price: 526.12, change: 0.5 },
];

const marketFeed = document.getElementById("marketFeed");
const headlineFeed = document.getElementById("headlineFeed");
const sportsList = document.getElementById("sportsScores");
const tickerTrack = document.getElementById("tickerTrack");
const liveTime = document.getElementById("liveTime");

const buildMeta = (story) => {
  const meta = document.createElement("div");
  meta.className = "meta";
  const source = document.createElement("span");
  source.textContent = story.source;
  const time = document.createElement("span");
  time.textContent = story.time;
  meta.append(source, time);
  return meta;
};

const renderStories = (target, stories, withTime = false) => {
  target.innerHTML = "";
  stories.forEach((story) => {
    const item = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = story.title;
    const summary = document.createElement("p");
    summary.textContent = story.summary;
    item.append(title, summary);
    if (withTime) {
      item.appendChild(buildMeta(story));
    } else {
      const meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = story.source;
      item.appendChild(meta);
    }
    target.appendChild(item);
  });
};

const renderScores = () => {
  sportsList.innerHTML = "";
  sportsScores.forEach((game) => {
    const card = document.createElement("li");
    card.className = "score-card";
    const header = document.createElement("header");
    header.textContent = game.league;
    const status = document.createElement("span");
    status.textContent = game.status;
    header.appendChild(status);

    const teams = document.createElement("div");
    teams.className = "score-teams";
    const matchup = document.createElement("span");
    matchup.textContent = game.matchup;
    const score = document.createElement("span");
    score.textContent = game.score;
    teams.append(matchup, score);

    const highlight = document.createElement("div");
    highlight.className = "score-status";
    highlight.textContent = "Live update in progress";

    card.append(header, teams, highlight);
    sportsList.appendChild(card);
  });
};

const renderTicker = () => {
  tickerTrack.innerHTML = "";
  const tickerItems = [...tickerSymbols, ...tickerSymbols];
  tickerItems.forEach((stock) => {
    const item = document.createElement("div");
    item.className = "ticker-item";
    const symbol = document.createElement("strong");
    symbol.textContent = stock.symbol;
    const price = document.createElement("span");
    price.textContent = stock.price.toFixed(2);
    const change = document.createElement("span");
    change.textContent = `${stock.change > 0 ? "+" : ""}${stock.change.toFixed(1)}%`;
    change.className = stock.change >= 0 ? "ticker-up" : "ticker-down";

    item.append(symbol, price, change);
    tickerTrack.appendChild(item);
  });
};

const refreshLiveTime = () => {
  const now = new Date();
  liveTime.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const rotateData = () => {
  marketStories.unshift(marketStories.pop());
  headlineStories.unshift(headlineStories.pop());
  sportsScores.unshift(sportsScores.pop());
  tickerSymbols.forEach((stock) => {
    const drift = (Math.random() - 0.5) * 0.8;
    stock.price = Math.max(10, stock.price + drift);
    stock.change = Math.max(-4, Math.min(4, stock.change + drift / 2));
  });
  renderStories(marketFeed, marketStories, true);
  renderStories(headlineFeed, headlineStories);
  renderScores();
  renderTicker();
};

renderStories(marketFeed, marketStories, true);
renderStories(headlineFeed, headlineStories);
renderScores();
renderTicker();
refreshLiveTime();

setInterval(refreshLiveTime, 1000);
setInterval(rotateData, 20000);
