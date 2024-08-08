import React, { useState } from 'react'
import parse from 'html-react-parser'

const Login = ({ onLogin, wpSiteUrl }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  console.log(`${wpSiteUrl}/wp-json/jwt-auth/v1/token`)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${wpSiteUrl}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      const data = await response.json()
      if (data.token) {
        onLogin(data)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <>
      <strong>Got account?</strong>
      {error && <p className={`error`}>{parse(error || '')}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className={`cta2`}>Login</button>
      </form>
    </>
  )
}

export default Login