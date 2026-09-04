import React, { useMemo, useState } from 'react'
import './shop.css'
import { seasonCatalog } from '../constants/seasonCatalog'

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value))

const normalizePrice = (value) => {
  const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(numericValue) ? numericValue : 0
}

const allCards = Object.values(seasonCatalog)
  .flatMap((season) =>
    (season.cards || []).map((card) => ({
      ...card,
      season: season.name,
      seasonId: Object.keys(seasonCatalog).find((key) => seasonCatalog[key].name === season.name)
    }))
  )

const Collection = ({ query = '', cards = [], onBack, onAddToCart, onCheckout, cartCount = 0 }) => {
  const [search, setSearch] = useState(query)

  const items = cards.length ? cards : allCards

  const filteredCards = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return items

    return items.filter((card) => {
      return (
        (card.name || '').toLowerCase().includes(term) ||
        (card.rarity || '').toLowerCase().includes(term) ||
        (card.season || '').toLowerCase().includes(term)
      )
    })
  }, [items, search])

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div>
          <div className="shop-kicker">PokéVault</div>
          <h1>All Collections</h1>
        </div>
        <div className="shop-actions">
          <button className="shop-btn secondary" onClick={onBack}>Back to dashboard</button>
          <button className="shop-btn primary" onClick={onCheckout}>Cart ({cartCount})</button>
        </div>
      </div>

      <div className="search-bar-row" style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
        <input
          className="search-box"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search all cards, rarity or season"
          style={{ width: '100%', maxWidth: 600 }}
        />
      </div>

      <div className="shop-layout">
        <div className="shop-grid">
          {filteredCards.map((card) => {
            const cardId = card._id || card.id || `${card.season || card.category || 'season'}-${card.name}`
            const isOutOfStock = Number(card.stock ?? 0) <= 0
            return (
              <div key={cardId} className="shop-card">
                <img className="shop-card-image" src={card.image} alt={card.name} />
                <div className="shop-body">
                  <div className="shop-tag">{card.season || card.category || 'Collection'}</div>
                  <h3>{card.name}</h3>
                  <p className="card-detail">{card.detail || card.description || 'Premium Pokémon card'}</p>
                  <div className="shop-meta">
                    <span>{card.rarity}</span>
                    <strong>{formatPrice(normalizePrice(card.price))}</strong>
                  </div>
                  <button
                    className="buy-btn"
                    disabled={isOutOfStock}
                    onClick={() => onAddToCart({ ...card, id: cardId })}
                  >
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Collection
