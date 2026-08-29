import './shop.css'

const Checkout = ({ cartItems = [], onBack, onUpdateQuantity, onRemoveFromCart, origin = 'shop' }) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = Number(String(item.price).replace(/[$,]/g, ''))
    return sum + itemPrice * item.quantity
  }, 0)

  const shipping = cartItems.length > 0 ? 12 : 0
  const total = subtotal + shipping
  const backLabel = origin === 'dashboard' ? 'Back to dashboard' : 'Back to shop'

  return (
    <div className="shop-page checkout-page">
      <div className="checkout-shell">
        <div className="checkout-header">
          <div>
            <div className="shop-kicker">PokéVault</div>
            <h1>Checkout</h1>
          </div>
          <button className="shop-btn secondary" onClick={onBack}>{backLabel}</button>
        </div>

        <div className="checkout-layout">
          <section className="checkout-card">
            <h2>Shipping Details</h2>
            <div className="checkout-form-grid">
              <label>
                Full Name
                <input type="text" defaultValue="Ash Ketchum" />
              </label>
              <label>
                Email
                <input type="email" defaultValue="ash@pokemail.com" />
              </label>
              <label className="full-width">
                Address
                <input type="text" defaultValue="Route 1, Pallet Town" />
              </label>
              <label>
                City
                <input type="text" defaultValue="Pallet" />
              </label>
              <label>
                ZIP Code
                <input type="text" defaultValue="12345" />
              </label>
            </div>
          </section>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              <>
                <div className="checkout-items">
                  {cartItems.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="checkout-item-copy">
                        <strong>{item.name}</strong>
                        <span>{item.rarity}</span>
                      </div>
                      <div className="checkout-item-actions">
                        <div className="quantity-control">
                          <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                        </div>
                        <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <strong>${shipping.toFixed(2)}</strong>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <button className="checkout-btn">Place Order</button>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout
