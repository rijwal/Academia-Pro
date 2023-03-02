import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import StudentForm from '../components/studentForm'
import {logout, reset} from '../features/auth/authSlice'
import { useEffect, useState } from 'react'





function AddStudent() {
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const {user} = useSelector((state) => state.auth)
      const {students} = useSelector((state) => state.student)

      const newStudents = JSON.parse(JSON.stringify(students))

      const onDashboard = () => {
        navigate('/')
      }

      const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
      }
    /*const [formData, setFormData] = useState({
        name: '',
        grade: '',
        age: '',
        score: ''
    })
    
      const {name, grade, age, score} = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()

      const {user} = useSelector((state) => state.auth)
      const {students, isSuccess, isLoading, isError, message} = useSelector(
        (state) => state.student
      )
    
      /*const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        
        if (!user) {
            navigate('/')
        }

        if (isError) {
          toast.error(message)
        }
    
        if(isSuccess) {
          navigate('/')
        }
    
        dispatch(reset())
    
      }, [user, navigate, dispatch, isError, isSuccess, message])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
            name, age, grade, score
        }
    
        dispatch(createStudent(userData))

      }
    
      if (isLoading) {
        return <h1>loading</h1>
      } */
    
      return (
        <>
          <div class = "homepage1">
          <input type="checkbox" id="check"/>
          <label for="check">
            <i class="fas fa-bars" id="btn"></i>
            <i class="fas fa-times" id="cancel"></i>
          </label>

          <div class="sidebar">
            <header>MENU</header>
            <button onClick={onDashboard}>Dashboard</button>
            <button onClick={onLogout}>Log Out</button>


          </div>
            <div class = "box2">
              <div class="signup">
                  <StudentForm/>
              </div>
            </div>
          </div>
        </>
      )    
}

export default AddStudent