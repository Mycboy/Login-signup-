import React, { useMemo, useState } from 'react'
import './Dashboard.css'

const seasons = [
  {
    id: 'kanto',
    name: 'Kanto',
    era: 'Gen 1',
    accent: '#ff6b6b',
    subtitle: 'Classic starters & Charizard legends',
    image: 'https://a0.cdn.japantravel.com/photo/72070-244854/1440x960%21/tokyo-pok%C3%A9park-kanto-opening-sooner-than-expected-244854.webp'
  },
  {
    id: 'johto',
    name: 'Johto',
    era: 'Gen 2',
    accent: '#ffa94d',
    subtitle: 'Golden era pulls and rare holo sets',
    image: 'https://i.redd.it/pkg81djwe30e1.png'
  },
  {
    id: 'hoenn',
    name: 'Hoenn',
    era: 'Gen 3',
    accent: '#51cf66',
    subtitle: 'Ruby & Sapphire powerhouses',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYCXGau_3X0gdKdWIHXqWPYBi_sW9lY7iQr-lDMkOUTbVMEmxuIqEw8e8&s=10'
  },
  {
    id: 'sinnoh',
    name: 'Sinnoh',
    era: 'Gen 4',
    accent: '#74c0fc',
    subtitle: 'Diamond-era favorites and iconic chases',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8rqiIo1e2YZLEjUYHh5yJ6bmk_SyOC6T2RA99GOeYQ&s=10'
  },
  {
    id: 'unova',
    name: 'Unova',
    era: 'Gen 5',
    accent: '#b197fc',
    subtitle: 'Black & White collector staples',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3G-R7jo-Rf5QAoHWXtoOmX7Sl4fVHvyD74e_kteGeYS4EfStgtj-8nLXL&s=10'
  },
  {
    id: 'kalos',
    name: 'Kalos',
    era: 'Gen 6',
    accent: '#ff8787',
    subtitle: 'Mega evolutions and premium finishes',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsDkdpnZpx2uczFajG1wAOXJSV_UkGsSuvM3Gfc-R7Zn1wpr4fLb3WjA&s=10'
  }
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

const Dashboard = ({ onLogout, onSelectSeason, onOpenCollection, onCheckout, onTrackOrder, cartCount = 0, hasOrders = false }) => {
  const [selectedSeason, setSelectedSeason] = useState('kanto')
  const [searchTerm, setSearchTerm] = useState('')

  const activeSeason = useMemo(
    () => seasons.find((season) => season.id === selectedSeason) || seasons[0],
    [selectedSeason]
  )

  const featuredCards = products[selectedSeason] || products.kanto

  const handleNavClick = (targetId) => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goToSeasonShop = (seasonId) => {
    setSelectedSeason(seasonId)
    if (onSelectSeason) onSelectSeason(seasonId)
  }

  return (
    <div className="pokemon-dashboard">
      <div className="dashboard-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-badge">⚡</div>
            <span>PokéVault</span>
          </div>

          <nav className="nav">
            <button type="button" onClick={() => handleNavClick('season-picker')}>Shop</button>
            <button type="button" onClick={() => onOpenCollection(searchTerm)}>Collections</button>
            <button type="button" onClick={() => handleNavClick('season-picker')}>Seasons</button>
            <button type="button" onClick={() => handleNavClick('hero-section')}>Deals</button>
          </nav>

          <div className="top-actions">
            <input
              className="search-box"
              placeholder="Search cards"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onOpenCollection(searchTerm)
                }
              }}
            />
            <button type="button" className="secondary-btn" onClick={() => onOpenCollection(searchTerm)}>Search</button>
            {hasOrders && (
              <button className="secondary-btn" onClick={onTrackOrder}>Track Order</button>
            )}
            <button className="cta-btn" onClick={onCheckout}>Cart ({cartCount})</button>
            {onLogout && (
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            )}
          </div>
        </header>

        <section className="hero" id="hero-section">
          <div className="hero-panel" id="collections">
            <div className="eyebrow">Elite trading cards</div>
            <h1>Choose your favorite Pokémon season.</h1>
            <p className="hero-text">
              Discover rare pulls, sealed vintage finds, and premium collector cards from every iconic Pokémon generation.
            </p>

            <div className="hero-buttons">
              <button className="cta-btn" onClick={() => goToSeasonShop(activeSeason.id)}>Shop Now</button>
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
              <img src={activeSeason.image} alt={activeSeason.name} className="current-drop-image" />
            </div>

            <div className="price-box">
              <div className="mini-label">Featured case</div>
              <div className="value">₹{selectedSeason === 'kanto' ? 3499 : selectedSeason === 'johto' ? 2899 : 3199}</div>
            </div>

            <div className="featured-copy">{activeSeason.subtitle}</div>
            <button className="cta-btn full-width" onClick={() => goToSeasonShop(activeSeason.id)}>Open {activeSeason.name}</button>
          </div>
        </section>

        <section className="season-picker" id="season-picker">
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
                onClick={() => goToSeasonShop(season.id)}
              >
                <img src={season.image} alt={season.name} className="season-card-image" />
                <div className="season-card-body">
                  <div className="era">{season.era}</div>
                  <h4>{season.name}</h4>
                  <p>{season.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

       
      </div>
    </div>
  )
}

export default Dashboard