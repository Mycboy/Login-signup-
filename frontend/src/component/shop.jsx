import React from 'react'
import './shop.css'
import { seasonCatalog } from '../constants/seasonCatalog'

const normalizePrice = (value) => {
  const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(numericValue) ? numericValue : 0
}

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0))

const Shop = ({
  seasonId = 'kanto',
  cards = [],
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
  cartItems = [],
  cartCount = 0
}) => {
  const season = seasonCatalog[seasonId] || seasonCatalog.kanto
  const seasonCards = cards.length ? cards : (seasonCatalog[seasonId]?.cards || seasonCatalog.kanto.cards)

  const toInrAmount = (value) => normalizePrice(value)

  const total = cartItems.reduce((sum, item) => {
    const value = toInrAmount(item.price)
    return sum + value * item.quantity
  }, 0)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div>
          <div className="shop-kicker">PokéVault</div>
          <h1>{season.name} Collection</h1>
        </div>
        <div className="shop-actions">
          <button className="shop-btn secondary" onClick={onBack}>Back to seasons</button>
          <button className="shop-btn primary" onClick={onCheckout}>Cart ({cartCount})</button>
        </div>
      </div>

      <p className="shop-description">{season.description}</p>

      <div className="shop-layout">
        <div className="shop-grid">
          {seasonCards.map((card) => (
            <div key={card.id || `${card.season || season.name}-${card.name}`} className="shop-card">
              <img className="shop-card-image" src={card.image} alt={card.name} />
              <div className="shop-body">
                <div className="shop-tag">{card.rarity}</div>
                <h3>{card.name}</h3>
                <p className="card-detail">{card.detail}</p>
                <div className="shop-meta">
                  <span>{card.stock ?? 1} left</span>
                  <strong>{formatPrice(toInrAmount(card.price))}</strong>
                </div>
                <button
                  className="buy-btn"
                  disabled={(Number(card.stock ?? 0) <= 0)}
                  onClick={() => onAddToCart({ ...card, id: card.id || `${card.name}-${card.rarity}` })}
                >
                  {Number(card.stock ?? 0) <= 0 ? 'Out of Stock' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-panel">
          <div className="cart-header">
            <h3>Cart Summary</h3>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.rarity}</span>
                    </div>
                    <div className="cart-actions">
                      <div className="quantity-control small">
                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>
                      <span className="cart-price">{formatPrice(toInrAmount(item.price) * item.quantity)}</span>
                      <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

export default Shop
