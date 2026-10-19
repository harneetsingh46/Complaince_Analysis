import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Link to="/">
            Complaince
          </Link>
        </div>
        <div>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Signup
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar