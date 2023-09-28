import React, { useState } from 'react'
import '../css/Sign.css'
// import account from '../images/account.png'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const postdata = async () => {
    if (name.length === 1) {
      toast.error('Plz write a valid name')
    }
    else if (password.length < 5) {
      toast.error('Password should be of mininmum 5 characters')
    }
    else {
      try {
        setLoading(true)
        const data = await fetch('https://impossible-calf-moccasins.cyclic.app/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name, email, password
          })
        })
        const res = await data.json()
        if (res.message === 'Profile created') {
          setLoading(false)
          navigate('/login')
        }
        else {
          setLoading(false)
          toast.error(res.message)
        }
      } catch (error) {
        console.log(error);
      }
    }

  }
  return (
    <div className='mainsign'>
      <div className="innersign">
        <div className="inner1">
          <div>
            <h1>Sign Up</h1>
          </div>
          <div className='name'>
            <div className='imagecon'>
              <img src='https://cdn-icons-png.flaticon.com/512/61/61205.png' alt="" />
            </div>
            <input type="text" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='name'>
            <div className='imagecon'>
              <img src='https://cdn.imgbin.com/12/21/21/imgbin-email-computer-icons-logo-email-61tT8WZwjzSaJiZAqgL8S9Gbi.jpg' alt="" />
            </div>
            <input type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='name'>
            <div className='imagecon'>
              <img src='https://e7.pngegg.com/pngimages/778/12/png-clipart-computer-icons-skype-icon-design-change-password-logo-internet.png' alt="" />
            </div>
            <input type="password" placeholder='Create a password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='btnsign'>
            <button onClick={postdata}>
              {
                loading ? <p>Signing....</p> : <p>SignUp</p>
              }
            </button>
          </div>
          <div className='user'>
            <p>Already a user ? </p>
            <p className='login' onClick={() => navigate('/login')}> Login</p>
          </div>
        </div>
        <div className="inner2">
          <img src="https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Signup
