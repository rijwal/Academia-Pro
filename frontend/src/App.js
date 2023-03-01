import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register';
import AddStudent from './pages/AddStudent'
import Winners from './pages/Winners';


function App() {
  return (
    <>
      <Router className='container'>
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/add' element={<AddStudent/>}/>
            <Route path='/winners' element={<Winners/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
