import { useEffect, useState } from 'react'
import './Tracking.css'

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value))

const Tracking = ({ orders = [], onBack }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? null)

  useEffect(() => {
    if (!orders.length) {
      setSelectedOrderId(null)
      return
    }

    if (!orders.some((order) => order.id === selectedOrderId)) {
      setSelectedOrderId(orders[0].id)
    }
  }, [orders, selectedOrderId])

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0]
  const previousOrders = orders.filter((order) => order.id !== selectedOrder?.id)

  return (
    <div className="tracking-page">
      <div className="tracking-shell">
        <div className="tracking-header">
          <div>
            <div className="shop-kicker">PokéVault</div>
            <h1>Track Order</h1>
          </div>
          <button className="shop-btn secondary" onClick={onBack}>Back to checkout</button>
        </div>

        {!selectedOrder ? (
          <div className="tracking-empty">
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here once you complete checkout.</p>
          </div>
        ) : (
          <>
            <div className="tracking-card">
              <div className="tracking-summary">
                <div>
                  <span className="label">Order ID</span>
                  <strong>#{selectedOrder.id}</strong>
                </div>
                <div>
                  <span className="label">Status</span>
                  <strong className="status-badge">{selectedOrder.status}</strong>
                </div>
              </div>

              <div className="tracking-steps">
                <div className="step active">
                  <span>1</span>
                  <div>
                    <strong>Order Confirmed</strong>
                    <p>Payment approved and packed.</p>
                  </div>
                </div>
                <div className="step">
                  <span>2</span>
                  <div>
                    <strong>Shipped</strong>
                    <p>Parcel is moving to your address.</p>
                  </div>
                </div>
                <div className="step">
                  <span>3</span>
                  <div>
                    <strong>Out for Delivery</strong>
                    <p>Courier is on the way.</p>
                  </div>
                </div>
                <div className="step">
                  <span>4</span>
                  <div>
                    <strong>Delivered</strong>
                    <p>Order will arrive at your doorstep.</p>
                  </div>
                </div>
              </div>

              <div className="tracking-details">
                <div className="detail-block">
                  <span className="label">Customer</span>
                  <strong>{selectedOrder.customerName}</strong>
                </div>
                <div className="detail-block">
                  <span className="label">Address</span>
                  <strong>{selectedOrder.address}</strong>
                </div>
                <div className="detail-block">
                  <span className="label">Payment</span>
                  <strong>{selectedOrder.paymentMethod}</strong>
                </div>
                <div className="detail-block">
                  <span className="label">Total</span>
                  <strong>{formatPrice(selectedOrder.total)}</strong>
                </div>
              </div>

              <div className="tracking-items">
                <h3>Items</h3>
                {selectedOrder.items.map((item) => (
                  <div className="tracked-item" key={`${selectedOrder.id}-${item.id}-${item.quantity}`}>
                    <span>{item.name}</span>
                    <span>{item.quantity}x</span>
                    <strong>{formatPrice(Number(item.price) * item.quantity)}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="tracking-history">
              <h3>Recent Orders</h3>
              {previousOrders.length === 0 ? (
                <p className="history-empty">This is your first order.</p>
              ) : (
                previousOrders.map((order) => (
                  <button
                    type="button"
                    className="history-row"
                    key={order.id || `${order.createdAt}-${order.total}`}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <span>#{order.id}</span>
                    <span>{order.paymentMethod}</span>
                    <strong>{formatPrice(order.total)}</strong>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Tracking
