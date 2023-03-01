import React from "react";
import { useDispatch } from 'react-redux'
import { deleteStudent } from "../features/students/studentSlice"

const handleEditClick = () => {

}

const handleDeleteClick = () => {

}

const ReadOnlyRow = ({ studenta}) => {

  const dispatch = useDispatch()

  return (
    <tr>

      <td>{studenta.name}</td>
      <td>{studenta.age}</td>
      <td>{studenta.grade}</td>
      <td>{studenta.score}</td>
      
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, studenta)}
        >
          Edit
        </button>
        <button type="button" onClick={() => dispatch(deleteStudent(studenta._id))}>
          Delete
        </button>
      </td>
            

    </tr>
  );
};

export default ReadOnlyRow;