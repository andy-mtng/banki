import Navbar from "./components/Navbar";
import { useState } from "react"
import { useSignup } from "./hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="bg-gray-100 h-screen">
        <Navbar />
        <div className="mt-8 flex justify-center items-center">
          <form className="flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">Sign up</h1>          
           
            <div className="mb-3">
              <label className="text-sm font-medium mb-4">Email address:</label>
              <input
                className="text=sm border border-gray-300 w-full rounded-sm h-8"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium">Password:</label>
              <input
                className="text=sm border border-gray-300 w-full rounded-sm h-8"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="rounded-sm bg-blue-700 px-4 py-2 w-full text-white tracking-widest text-xs" disabled={isLoading}>SIGN UP</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
    </div>
  )
}

export default Signup