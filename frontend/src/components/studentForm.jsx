import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStudent } from '../features/students/studentSlice'
import {useNavigate} from 'react-router-dom'

function StudentForm () {

    const [formData, setFormData] = useState({
        name: '',
        grade: {},
        age: {},
        sportingEvents: {},
        nonSportingEvents: {}
    })

    const {name, grade, age, sportingEvents, nonSportingEvents} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        const studentData = {
            name, age, grade, sportingEvents, nonSportingEvents
        }
        
        //console.log(studentData)

        dispatch(createStudent(studentData))
        navigate('/')
        setFormData('')

      }

      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }

    return (
        <form onSubmit={onSubmit}>
            <label>Add Student</label>
            <input type="text" id="name" name="name" value={name} placeholder="Name" onChange={onChange} />
            <input type="number" id="age" name="age" value={age} placeholder="Age" onChange={onChange}/>
            <input type="number" id="grade" name="grade" value={grade} placeholder="Grade" onChange={onChange}/>
            <input type="number" id="sportingEvents" name="sportingEvents" value={sportingEvents} placeholder="Sporting Events" onChange={onChange}/>
            <input type="number" id="nonSportingEvents" name="nonSportingEvents" value={nonSportingEvents} placeholder="Non Sporting Events" onChange={onChange}/>

            <button type="submit">Sign Up</button>
        </form>
    )

}

export default StudentForm