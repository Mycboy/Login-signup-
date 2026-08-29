import { useMemo, useState } from 'react'
import './shop.css'

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value))

const parsePrice = (value) => Number(String(value).replace(/[^\d.]/g, ''))
const usdToInr = (amount) => Math.round(Number(amount) * 82)

const payments = [
  'UPI',
  'Debit/Credit Card',
  'Net Banking',
  'Wallets (Paytm / PhonePe / GPay)',
  'Cash on Delivery'
]

const Checkout = ({ cartItems = [], onBack, onUpdateQuantity, onRemoveFromCart, origin = 'shop' }) => {
  const [selectedPayment, setSelectedPayment] = useState('UPI')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Ash Ketchum',
    email: 'ash@pokemail.com',
    address: 'Route 1, Pallet Town',
    city: 'Pallet',
    zip: '12345',
    upi: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    bankName: '',
    wallet: ''
  })

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = usdToInr(parsePrice(item.price))
      return sum + itemPrice * item.quantity
    }, 0)
  }, [cartItems])

  const shipping = cartItems.length > 0 ? 120 : 0
  const total = subtotal + shipping
  const backLabel = origin === 'dashboard' ? 'Back to dashboard' : 'Back to shop'

  const requiredFields = {
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    address: formData.address.trim(),
    city: formData.city.trim(),
    zip: formData.zip.trim()
  }

  const paymentDetailsRequired = {
    UPI: !!formData.upi.trim(),
    'Debit/Credit Card': !!formData.cardNumber.trim() && !!formData.cardName.trim() && !!formData.expiry.trim(),
    'Net Banking': !!formData.bankName.trim(),
    'Wallets (Paytm / PhonePe / GPay)': !!formData.wallet.trim(),
    'Cash on Delivery': true
  }

  const missingDetails = !Object.values(requiredFields).every(Boolean) || !paymentDetailsRequired[selectedPayment]

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handlePlaceOrder = () => {
    if (missingDetails) return
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="shop-page order-success-page">
        <div className="success-card">
          <div className="success-badge">✓</div>
          <h1>Order placed successfully!</h1>
          <p>Your Pokémon card order has been confirmed and is being prepared for dispatch.</p>
          <div className="success-summary">
            <span>Total paid</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button className="checkout-btn" onClick={onBack}>Continue Shopping</button>
        </div>
      </div>
    )
  }

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
                <input type="text" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
              </label>
              <label>
                Email
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
              </label>
              <label className="full-width">
                Address
                <input type="text" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
              </label>
              <label>
                City
                <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
              </label>
              <label>
                ZIP Code
                <input type="text" value={formData.zip} onChange={(e) => handleChange('zip', e.target.value)} />
              </label>
            </div>

            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {payments.map((method) => (
                  <label key={method} className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPayment === method}
                      onChange={() => setSelectedPayment(method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              {selectedPayment === 'UPI' && (
                <div className="payment-field-group">
                  <label>
                    UPI ID
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={formData.upi}
                      onChange={(e) => handleChange('upi', e.target.value)}
                    />
                  </label>
                </div>
              )}

              {selectedPayment === 'Debit/Credit Card' && (
                <div className="payment-field-group">
                  <label>
                    Card Number
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleChange('cardNumber', e.target.value)}
                    />
                  </label>
                  <label>
                    Name on Card
                    <input
                      type="text"
                      placeholder="ASH KETCHUM"
                      value={formData.cardName}
                      onChange={(e) => handleChange('cardName', e.target.value)}
                    />
                  </label>
                  <label>
                    Expiry Date
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                    />
                  </label>
                </div>
              )}

              {selectedPayment === 'Net Banking' && (
                <div className="payment-field-group">
                  <label>
                    Bank Name
                    <input
                      type="text"
                      placeholder="HDFC / ICICI / SBI"
                      value={formData.bankName}
                      onChange={(e) => handleChange('bankName', e.target.value)}
                    />
                  </label>
                </div>
              )}

              {selectedPayment === 'Wallets (Paytm / PhonePe / GPay)' && (
                <div className="payment-field-group">
                  <label>
                    Wallet Provider
                    <input
                      type="text"
                      placeholder="Paytm / PhonePe / GPay"
                      value={formData.wallet}
                      onChange={(e) => handleChange('wallet', e.target.value)}
                    />
                  </label>
                </div>
              )}
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
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <strong>{formatPrice(shipping)}</strong>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>

                <button className="checkout-btn" disabled={missingDetails} onClick={handlePlaceOrder}>
                  {missingDetails ? 'Complete Details to Place Order' : 'Place Order'}
                </button>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout
