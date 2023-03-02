import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { useEffect, useState } from 'react'



function Winners() {

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

  function customComparator(a,b) {
    return b.score-a.score
  }

  var sorted = newStudents.sort(customComparator)


  // initializing vairbales
  let sortedGrade10 = []
  let sortedGrade11 = []
  let sortedGrade12 = []
  let highestGrade10
  let highestGrade11
  let highestGrade12
  let randomGrade10
  let randomGrade11
  let randomGrade12
  //finding grade 10 highest
  /*for (let i = 0; i < sorted.length; i++) {
    highestGrade10 = sorted[i].name
    if (sorted[i].grade == 10) {break}
  }
  //grade 11
  for (let i = 0; i < sorted.length; i++) {
    highestGrade11 = sorted[i].name
    if (sorted[i].grade == 11) {break}
  }
  //grade 12
  for (let i = 0; i < sorted.length; i++) {
    highestGrade12 = sorted[i].name
    if (sorted[i].grade == 12) {break}
  }*/

  //getting grade 10 sorted list
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].grade == 10) {
      sortedGrade10.push(sorted[i])
    }
    if (sorted[i].grade == 11) {
      sortedGrade11.push(sorted[i])
    } 
    if (sorted[i].grade == 12) {
      sortedGrade12.push(sorted[i])
    } 
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  var randomIndex10 = getRandomInt(sortedGrade10.length-1)
  var randomIndex11 = getRandomInt(sortedGrade11.length-1)
  var randomIndex12 = getRandomInt(sortedGrade12.length-1)

  highestGrade10 = sortedGrade10[0].name
  highestGrade11 = sortedGrade11[0].name
  highestGrade12 = sortedGrade12[0].name

  randomGrade10 = sortedGrade10[randomIndex10]
  randomGrade11 = sortedGrade11[randomIndex11]
  randomGrade12 = sortedGrade12[randomIndex12]

  var randomList = [randomGrade10, randomGrade11, randomGrade12]

  var sortedRandom = randomList.sort(customComparator)
  const num1Random = sortedRandom[0].name
  const num2Random = sortedRandom[1].name
  const num3Random = sortedRandom[2].name

  return (
  
    <div class = "main">
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

      <div class = "images">
        <img src = {require ("../images/logo1.png")} width = "260" height = "140" alt = ""/>
      </div>
      <div class = "text3">
          <h2>Quarterly Winnings</h2>
      </div>

      <div class = "box3">
        <div class = "text6">
          <h2>
            Highest Points
          </h2>
          <div class =  "text7">
            <h2>{highestGrade10} Had The Highest Number Of Points In Grade 10; They Win A Hoodie</h2>
            <h2>{highestGrade11} Had The Highest Number Of Points In Grade 11; They Win A Hoodie</h2> 
            <h2>{highestGrade12} Had The Highest Number Of Points In Grade 12; They Win A Hoodie</h2>
          </div>
        </div>
              
        <div class = "text9">
          <h2>
            Random Winners
          </h2>
          <div class =  "text10">
            <h2>{num1Random} Is The Chosen Random Winner In Grade 10; They Win A Hoodie</h2>
            <h2>{num2Random} Is The Chosen Random Winner In Grade 11; They Win Snacks</h2> 
            <h2>{num3Random} Is The Chosen Random Winner In Grade 12; They Win A Sweatshirt</h2>
          </div>
        </div>

      </div>
  </div>
  )
}

export default Winners