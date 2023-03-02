import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { deleteStudent, editStudent } from "../features/students/studentSlice"




const handleDeleteClick = () => {

}

const ReadOnlyRow = ({ studenta}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate('/')
  }

  return (
    <tr>

      <td>{studenta.name}</td>
      <td>{studenta.age}</td>
      <td>{studenta.grade}</td>
      <td>{studenta.score}</td>
      
      <td>
       
        <button type="button" onClick={() => dispatch(deleteStudent(studenta._id))}>
          Delete
        </button>
      </td>
            

    </tr>
  );
};

export default ReadOnlyRow;

/*<button
type="button"
onClick={(event) => handleEditClick(event, studenta)}
>
Edit
</button>*/