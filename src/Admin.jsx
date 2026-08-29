import { useEffect, useMemo, useState } from 'react'
import { API_BASE } from './api'

const AdminDashboard = ({ user, token, onLogout }) => {
  const [overview, setOverview] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, revenue: 0 })
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

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

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
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
                <button onClick={() => handleDeleteUser(u._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
          <h3>Products</h3>
          {products.map((p) => (
            <div key={p._id} style={{ borderBottom: '1px solid #334155', padding: '10px 0' }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <small style={{ color: '#94a3b8' }}>{p.category} • {p.rarity}</small>
              <div style={{ color: '#fbbf24', marginTop: 6 }}>{formatPrice(p.price)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#111827', borderRadius: 18, padding: 20, marginTop: 24 }}>
        <h3>Orders</h3>
        {orders.map((order) => (
          <div key={order._id} style={{ borderBottom: '1px solid #334155', padding: '12px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <strong>#{order._id.slice(-6)}</strong>
                <div style={{ color: '#94a3b8' }}>{order.customerName} • {order.email}</div>
              </div>
              <div>{formatPrice(order.total)}</div>
              <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
