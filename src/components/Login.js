import React, { useState } from 'react'
import '../css/Sign.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const[show,setShow]=useState('password')
  const open =()=>{
    if(show==='password'){
      setShow('text')
    }
    else{
      setShow('password')
    }
  }
  const [loading, setLoading] = useState(false)
    const navigate  = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const postdata = async () => {
      try {
        setLoading(true)
        const data = await fetch('https://impossible-calf-moccasins.cyclic.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             email, password
          })
        })
        const res = await data.json()
        if (res.message==='invalid credentials') {
          setLoading(false)
          toast.error(res.message)     
        }
        else{
          setLoading(false)
          localStorage.setItem('token' ,res.token)
          navigate('/')
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='mainsign'>
    <div className="innersign">
      <div className="inner1">
            <div>
              <h1>Login</h1>
            </div>
            <div className='name'>
            <div className='imagecon'>
              <img src='https://cdn.imgbin.com/12/21/21/imgbin-email-computer-icons-logo-email-61tT8WZwjzSaJiZAqgL8S9Gbi.jpg' alt="" />
            </div>
            <input type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='name'>
            <div className='imagecon' onClick={open}>
              <img src='https://e7.pngegg.com/pngimages/778/12/png-clipart-computer-icons-skype-icon-design-change-password-logo-internet.png' alt="" />
            </div>
            <input type={show} placeholder='Enter a password' onChange={(e) => setPassword(e.target.value)} />
          </div>
            <div className='btnsign'>
            <button onClick={postdata}>
              {
               loading ? <p>Logging....</p> : <p>Login</p>
              }
            </button>
            </div>
            <div className='user'>
              <p>New user ? </p>
              <p className='login' onClick={()=>navigate('/sign')}>SignUp</p>
            </div>
      </div>
      <div className="inner2">
          <img src="https://media.istockphoto.com/id/679304972/photo/man-lifting-dumbbells.jpg?s=612x612&w=0&k=20&c=xph2mPInFl8wUAV32yMUnC6birEp43E-bjX-RW48vTc=" alt="" />
      </div>
    </div>
    <Toaster/>
  </div>
  )
}

export default Login
