const rawBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
const cleanBase = rawBase.trim().replace(/\/+$/, '')
export const API_BASE = cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`
