import React, { useMemo, useState } from 'react'
import './Dashboard.css'

const seasons = [
  { id: 'kanto', name: 'Kanto', era: 'Gen 1', accent: '#ff6b6b', subtitle: 'Classic starters & Charizard legends' },
  { id: 'johto', name: 'Johto', era: 'Gen 2', accent: '#ffa94d', subtitle: 'Golden era pulls and rare holo sets' },
  { id: 'hoenn', name: 'Hoenn', era: 'Gen 3', accent: '#51cf66', subtitle: 'Ruby & Sapphire powerhouses' },
  { id: 'sinnoh', name: 'Sinnoh', era: 'Gen 4', accent: '#74c0fc', subtitle: 'Diamond-era favorites and iconic chases' },
  { id: 'unova', name: 'Unova', era: 'Gen 5', accent: '#b197fc', subtitle: 'Black & White collector staples' },
  { id: 'kalos', name: 'Kalos', era: 'Gen 6', accent: '#ff8787', subtitle: 'Mega evolutions and premium finishes' }
]

const products = {
  kanto: [
    { name: 'Charizard Holo', price: '$189', rarity: 'Ultra Rare', tag: 'Best Seller' },
    { name: 'Blastoise PSA', price: '$145', rarity: 'Mint Grade', tag: 'Featured' },
    { name: 'Pikachu Illustrator', price: '$560', rarity: 'Museum Piece', tag: 'Vault' }
  ],
  johto: [
    { name: 'Machamp Reverse', price: '$94', rarity: 'Holo Reverse', tag: 'Popular' },
    { name: 'Typhlosion 1st Ed', price: '$120', rarity: 'Collector', tag: 'Hot' },
    { name: 'Gyarados Gold Star', price: '$210', rarity: 'Gold Star', tag: 'Rare' }
  ],
  hoenn: [
    { name: 'Sceptile EX', price: '$76', rarity: 'EX', tag: 'Trending' },
    { name: 'Rayquaza Delta', price: '$118', rarity: 'Rare', tag: 'Fresh Stock' },
    { name: 'Deoxys Prism', price: '$132', rarity: 'Prism', tag: 'Collector' }
  ],
  sinnoh: [
    { name: 'Dialga Gx', price: '$98', rarity: 'GX', tag: 'Strong Pull' },
    { name: 'Palkia Vstar', price: '$89', rarity: 'VSTAR', tag: 'Popular' },
    { name: 'Lucario Platinum', price: '$114', rarity: 'Platinum', tag: 'Premium' }
  ],
  unova: [
    { name: 'Reshiram B/W', price: '$82', rarity: 'Rare', tag: 'New' },
    { name: 'Zoroark NXD', price: '$70', rarity: 'NXD', tag: 'Classic' },
    { name: 'Kyurem Dragon', price: '$104', rarity: 'Collector', tag: 'Top Pick' }
  ],
  kalos: [
    { name: 'Mega Gengar', price: '$130', rarity: 'Mega', tag: 'Hot' },
    { name: 'Sylveon EX', price: '$75', rarity: 'EX', tag: 'Fan Favorite' },
    { name: 'Greninja Break', price: '$88', rarity: 'Break', tag: 'Fresh' }
  ]
}

const Dashboard = ({ onLogout }) => {
  const [selectedSeason, setSelectedSeason] = useState('kanto')

  const activeSeason = useMemo(
    () => seasons.find((season) => season.id === selectedSeason) || seasons[0],
    [selectedSeason]
  )

  const featuredCards = products[selectedSeason]

  return (
    <div className="pokemon-dashboard">
      <div className="dashboard-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-badge">⚡</div>
            <span>PokéVault</span>
          </div>

          <nav className="nav">
            <span>Shop</span>
            <span>Collections</span>
            <span>Seasons</span>
            <span>Deals</span>
          </nav>

          <div className="top-actions">
            <input className="search-box" placeholder="Search cards" />
            <button className="cta-btn">Cart (3)</button>
            {onLogout && (
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            )}
          </div>
        </header>

        <section className="hero">
          <div className="hero-panel">
            <div className="eyebrow">Elite trading cards</div>
            <h1>Choose your favorite Pokémon season.</h1>
            <p className="hero-text">
              Discover rare pulls, sealed vintage finds, and premium collector cards from every iconic Pokémon generation.
            </p>

            <div className="hero-buttons">
              <button className="cta-btn">Shop Now</button>
              <button className="secondary-btn">View Collection</button>
            </div>

            <div className="stats">
              <div className="stat">
                <strong>12k+</strong>
                <span>cards sold</span>
              </div>
              <div className="stat">
                <strong>4.9/5</strong>
                <span>seller rating</span>
              </div>
              <div className="stat">
                <strong>24h</strong>
                <span>dispatch time</span>
              </div>
            </div>
          </div>

          <div className="trend-card">
            <div>
              <div className="mini-label">Current drop</div>
              <h2>{activeSeason.name}</h2>
            </div>

            <div className="price-box">
              <div className="mini-label">Featured case</div>
              <div className="value">$349</div>
            </div>

            <div className="featured-copy">{activeSeason.subtitle}</div>
          </div>
        </section>

        <section className="season-picker">
          <div className="section-header">
            <h3>Choose a season</h3>
            <button className="secondary-btn">View all</button>
          </div>

          <div className="season-list">
            {seasons.map((season) => (
              <div
                key={season.id}
                className={`season-card ${selectedSeason === season.id ? 'active' : ''}`}
                style={{ background: selectedSeason === season.id ? `linear-gradient(135deg, ${season.accent}22, rgba(15,23,42,0.8))` : undefined }}
                onClick={() => setSelectedSeason(season.id)}
              >
                <div className="era">{season.era}</div>
                <h4>{season.name}</h4>
                <p>{season.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="products">
          {featuredCards.map((card, index) => (
            <div key={card.name} className="product-card">
              <div className="product-art" style={{ background: `linear-gradient(135deg, ${activeSeason.accent}44, rgba(59,130,246,0.18))` }}>
                {index % 2 === 0 ? '⚡' : index % 3 === 0 ? '🔥' : '🌟'}
              </div>
              <div className="product-body">
                <div className="product-tag">{card.tag}</div>
                <h4>{card.name}</h4>
                <div className="product-meta">
                  <span className="rarity">{card.rarity}</span>
                  <span className="price">{card.price}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Dashboard