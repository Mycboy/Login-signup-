import { useEffect, useMemo, useState } from 'react'
import { API_BASE } from './api'

const AdminDashboard = ({ user, token, onLogout, onProductsChanged }) => {
  const [overview, setOverview] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, revenue: 0 })
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    season: 'kanto',
    rarity: 'Common',
    image: '',
    stock: '',
    description: ''
  })
  const [editingProductId, setEditingProductId] = useState(null)

  const fetchAdminData = async () => {
    try {
      const [overviewRes, usersRes, productsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/admin/overview`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (!overviewRes.ok || !usersRes.ok || !productsRes.ok || !ordersRes.ok) {
        throw new Error('Admin access failed')
      }

      const overviewData = await overviewRes.json()
      const usersData = await usersRes.json()
      const productsData = await productsRes.json()
      const ordersData = await ordersRes.json()

      setOverview(overviewData)
      setUsers(usersData)
      setProducts(productsData)
      setOrders(ordersData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [token])

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(value || 0))

  const statCards = useMemo(
    () => [
      { label: 'Total Users', value: overview.totalUsers },
      { label: 'Total Products', value: overview.totalProducts },
      { label: 'Total Orders', value: overview.totalOrders },
      { label: 'Revenue', value: formatPrice(overview.revenue) }
    ],
    [overview]
  )

  const handleRoleChange = async (userId, role) => {
    await fetch(`${API_BASE}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    })

    fetchAdminData()
  }

  const handleDeleteUser = async (userId) => {
    await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchAdminData()
  }

  const handleDeleteOrder = async (orderId) => {
    await fetch(`${API_BASE}/admin/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchAdminData()
  }

  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      category: '',
      season: 'kanto',
      rarity: 'Common',
      image: '',
      stock: '',
      description: ''
    })
    setEditingProductId(null)
  }

  const handleProductSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      season: productForm.season || productForm.category || 'kanto'
    }

    const method = editingProductId ? 'PUT' : 'POST'
    const url = editingProductId
      ? `${API_BASE}/admin/products/${editingProductId}`
      : `${API_BASE}/admin/products`

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error('Product save failed')
      return
    }

    resetProductForm()
    fetchAdminData()
    if (onProductsChanged) {
      await onProductsChanged()
    }
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product._id)
    setProductForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      season: product.season || product.category || 'kanto',
      rarity: product.rarity,
      image: product.image || '',
      stock: String(product.stock),
      description: product.description || ''
    })
  }

  const handleDeleteProduct = async (productId) => {
    await fetch(`${API_BASE}/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchAdminData()
    if (onProductsChanged) {
      await onProductsChanged()
    }
  }

  const handleStatusChange = async (orderId, status) => {
    await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })

    fetchAdminData()
  }

  if (loading) {
    return <div style={{ padding: 40, color: '#fff' }}>Loading admin panel...</div>
  }

  return (
    <div style={{ padding: 32, background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12 }}>PokéVault</div>
          <h1 style={{ margin: '8px 0 0' }}>Admin Dashboard</h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span>{user?.name}</span>
          <button onClick={onLogout} style={{ padding: '10px 16px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {statCards.map((card) => (
          <div key={card.label} style={{ background: '#111827', border: '1px solid #334155', borderRadius: 18, padding: 20 }}>
            <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase' }}>{card.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <div style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>Inventory</h3>
            <span style={{ color: '#94a3b8' }}>{products.length} items</span>
          </div>

          {products.length === 0 ? (
            <p style={{ color: '#94a3b8', margin: 0 }}>No products found yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {products.map((p) => (
                <div key={p._id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 16, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <strong style={{ fontSize: 15 }}>{p.name}</strong>
                    <span style={{ background: '#1f2937', color: '#fbbf24', borderRadius: 999, padding: '4px 8px', fontSize: 12 }}>
                      {Number(p.stock || 0)} left
                    </span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>{p.category} • {p.rarity}</div>
                  <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 10 }}>{formatPrice(p.price)}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 14 }}>{p.description || 'No description added yet.'}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEditProduct(p)} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: 'none', background: '#1d4ed8', color: '#fff' }}>Edit</button>
                    <button onClick={() => handleDeleteProduct(p._id)} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: 'none', background: '#dc2626', color: '#fff' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
            <h3 style={{ marginTop: 0 }}>Add Product</h3>

            <form onSubmit={handleProductSubmit} style={{ display: 'grid', gap: 10 }}>
              <input
                placeholder="Product name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input
                  placeholder="Price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
                />
                <input
                  placeholder="Stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input
                  placeholder="Category"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
                />
                <select
                  value={productForm.season}
                  onChange={(e) => setProductForm({ ...productForm, season: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
                >
                  <option value="kanto">Kanto</option>
                  <option value="johto">Johto</option>
                  <option value="hoenn">Hoenn</option>
                  <option value="sinnoh">Sinnoh</option>
                  <option value="unova">Unova</option>
                  <option value="kalos">Kalos</option>
                </select>
              </div>
              <input
                placeholder="Rarity"
                value={productForm.rarity}
                onChange={(e) => setProductForm({ ...productForm, rarity: e.target.value })}
                style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
              />
              <input
                placeholder="Image URL"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
              />
              <textarea
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                style={{ padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff', minHeight: 80 }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: 'none', background: '#f59e0b', color: '#111827', fontWeight: 700 }}>
                  {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
                {editingProductId && (
                  <button type="button" onClick={resetProductForm} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: 'transparent', color: '#fff' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
            <h3>Users</h3>
            {users.map((u) => (
              <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', padding: '12px 0' }}>
                <div>
                  <div>{u.name}</div>
                  <small style={{ color: '#94a3b8' }}>{u.email}</small>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <select value={u.role || 'user'} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => handleDeleteUser(u._id)}>Remove User</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
            <h3>Orders</h3>
            {orders.map((order) => (
              <div key={order._id} style={{ borderBottom: '1px solid #334155', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <strong>#{order._id.slice(-6)}</strong>
                    <div style={{ color: '#94a3b8' }}>{order.customerName} • {order.email}</div>
                  </div>
                  <div>{formatPrice(order.total)}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button onClick={() => handleDeleteOrder(order._id)} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 10px' }}>Remove Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
