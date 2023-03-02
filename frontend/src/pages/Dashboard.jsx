import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../styles.css";
import ReadOnlyRow from "../components/ReadOnlyRow.js";
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';
import {getStudents} from '../features/students/studentSlice';
import { useEffect } from 'react';


function Dashboard () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {students, isLoading, isError, message} = useSelector(
    (state) => state.student
  )
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getStudents())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  
  if (isLoading) {
    <h1>loading</h1>
  }
  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onClick1 = () => {
    navigate('/winners')
  }

  const onAdd = () => {
    navigate('/add')
  }


  const [studentas, setStudents] = useState(students);
  //console.log(studentas);
  const [addFormData, setAddFormData] = useState({
    user: "",
    name: "",
    age: "",
    grade:"",
    score: "",
  });


  const [editFormData, setEditFormData] = useState({
    user: "",
    name: "",
    age: "",
    grade:"",
    score: "",
  });


  const [editStudentId, setEditStudentId] = useState(null);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedStudent = {
      id: editStudentId,
      user: editFormData.user,
      name: editFormData.name,
      age: editFormData.age,
      grade: editFormData.grade,
      score: editFormData.score,
    };
    const newStudents = [...studentas];
    const index = studentas.findIndex((studenta) => studenta.id === editStudentId);
    newStudents[index] = editedStudent;
    setStudents(newStudents);
    setEditStudentId(null);
  };

  

  return (
    <>
    <div class = "main">
      <input type="checkbox" id="check"/>
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>

      </label>

      <div class="sidebar">
        <header>Menu</header>
        <button onClick={onClick1}>Quarterly Winners</button>
        <button onClick={onAdd}>Add Student</button>
        <button onClick={onLogout}>Log Out</button>
      </div>

      <div class = "images">
        <img src = {require ("../images/logo1.png")} width = "210" height = "140" alt = ""/>
      </div>

      <div class = "text4">
        <h2>Student's List</h2>
      </div>


      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>AGE</th>
                <th>GRADE</th>
                <th>SCORE</th>
                <th>ACTIONS</th>

              </tr>
            </thead>
            <tbody>
              {studentas.map((studenta) => (
                
                    <ReadOnlyRow
                      studenta={studenta}
                    />
              
              ))}
            </tbody>
          </table>
        </form>
      </div>
  </div>
  </>
  );
};


export default Dashboard;