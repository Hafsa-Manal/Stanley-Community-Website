import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import api from '../api/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const res = await api.post('/api/users/sync')
          setDbUser(res.data)
        } catch (err) {
          console.error('User sync failed:', err)
        }
      } else {
        setUser(null)
        setDbUser(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const logout = () => signOut(auth)

  const isAdmin = dbUser?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, logout, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
