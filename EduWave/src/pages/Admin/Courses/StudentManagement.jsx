import React from 'react'
import { useParams } from 'react-router-dom'


function StudentManagement() {

    let title = useParams();
  return (
    <div>
     <h1>Student Management  here !!!</h1>
    </div>
  )
}

export default StudentManagement
