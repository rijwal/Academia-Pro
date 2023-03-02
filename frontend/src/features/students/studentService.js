import axios from 'axios'

const API_URL = '/api/students/'

const getStudents = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data

}

const createStudent = async (studentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, studentData, config)

    return response.data
}

const deleteStudent = async (studentId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + studentId, config)
  
    return response.data
}

const studentService = {
    getStudents, createStudent, deleteStudent
}

export default studentService