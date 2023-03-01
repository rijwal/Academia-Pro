import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createStudent, reset } from '../features/students/studentSlice'
import StudentForm from '../components/studentForm'


function AddStudent() {
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
            <div class = "box1">
              <div class="signup">
                  <StudentForm/>
              </div>
            </div>
          </div>
        </>
      )    
}

export default AddStudent