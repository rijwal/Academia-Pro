import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <h1>loading</h1>
  }

  return (
    <>
      <div class = "homepage1">
        <div class = "box2">
          <div class="signup">
              <form onSubmit={onSubmit}>
                  <label>New To Academia Pro. Create An Account For Free Today</label>
                  <input type="text" id="name" name="name" value={name} placeholder="Name" onChange={onChange}/>
                  <input type="email" id="email" name="email" value={email} placeholder="Email" onChange={onChange}/>
                  <input type="password" id="password" name="password" value={password} placeholder="Password" onChange={onChange}/>
                  <input type="password" id="password2" name="password2" value={password2} placeholder="Confirm Password" onChange={onChange}/>

                  <button type="submit">Sign Up</button>
              </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register