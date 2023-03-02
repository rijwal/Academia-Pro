import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useState, useEffect} from 'react'
import {login, reset} from '../features/auth/authSlice' //importing 


function Login() {

    const [formData, setFormData] = useState({ //requires for a string 
        email: '',
        password: ''
    })
    
    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onRegister = () => {
        navigate('/register')
    }

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if(isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
    
      }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <h1>loading</h1>
    }

    return ( 
      <>
          <div class = "homepage"> 
              <div class = "box1">
                  <div class="login">
                      <form onSubmit={onSubmit}>
                          <label>Returning User. Welcome Back</label>
                          <input type="email" id="email" name="email" value={email} placeholder="Email" onChange={onChange}/>
                          <input type="password" id="password" name="password" value={password} placeholder="Password" onChange={onChange}/>
                          <button type="submit">Log In</button>
                      </form>
                      <label>New To Academia Pro. Create An Account For Free Today</label>
                      <button onClick={onRegister}>Sign Up</button>
                  </div>
              </div>
  
              <div class = "text1">
                  
                  <h1> Engage.</h1>
                  <h1> Encourage. </h1> 
                  <h1> Succeed.</h1>
              </div>
  
              <div class = "images1">
                  <img src = {require ("../images/logo1.png")} width = "400" height = "216" alt = ""/>
              </div>
  
          </div>
  
      </>
    )
  }
  
  export default Login