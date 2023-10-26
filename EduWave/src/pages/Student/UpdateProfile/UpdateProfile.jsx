import React, { useState } from 'react';
import './UpdatePage.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    rollNo:2022614,
    email: 'john.doe@example.com',
    dob: "02-02-2003",
    phone:9915667484,
    gender:"female",
    address:"Jalandhar"

    
  });

  const [editableField, setEditableField] = useState(null);

  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  return (
    <div className="update-page">
      <h1>Update Information</h1>
       
      <div className="profile-photo">
          <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="Profile" />
          {/* <br /> */}
          <AddCircleOutlineIcon className='icon' fontSize='large'/>
          <h2>Seea Rani</h2>
        </div>
       <div className="form">

       

      <form className='form'>
        <div className="form-group">
          <label>Name :</label>
          {editableField === 'name' ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
          ) : (
            <span>{formData.name}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('name')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>Roll No.:</label>
          {editableField === 'rollNo' ? (
            <input
              type="number"
              value={formData.rollNo}
              onChange={(e) => handleFieldChange('rollNo', e.target.value)}
            />
          ) : (
            <span>{formData.rollNo}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('rollNo')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>Email :</label>
          {editableField === 'email' ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          ) : (
            <span>{formData.email}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('email')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>DOB :</label>
          {editableField === 'dob' ? (
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleFieldChange('dob', e.target.value)}
            />
          ) : (
            <span>{formData.dob}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('dob')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>Phone :</label>
          {editableField === 'phone' ? (
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
            />
          ) : (
            <span>{formData.phone}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('phone')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          {editableField === 'gender' ? (
            <input
              type="text"
              value={formData.gender}
              onChange={(e) => handleFieldChange('gender', e.target.value)}
            />
          ) : (
            <span>{formData.gender}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('gender')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        <div className="form-group">
          <label>Address:</label>
          {editableField === 'address' ? (
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
            />
          ) : (
            <span>{formData.address}</span>
          )}
          <button
            type="button"
            onClick={() => handleEditClick('address')}
            className="edit-button"
          >
            ✏️
          </button>
        </div>

        

        <Link to="/studentDashboard/Profile">
        <button type="submit">Save</button>
        </Link>
        
      </form>
      </div>
    </div>
  );
}

export default UpdateProfile;





// import React, { useState } from 'react';
// // import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// // import { Form } from 'react-router-dom';
// import Form

// function UpdateProfile() {
//   const [formData, setFormData] = useState({
//     name: 'John Doe', // Initial values for demonstration
//     email: 'john@example.com',
//     // Add more fields as needed
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send updated user data to your API or database
//     console.log('Updated user data:', formData);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={6} lg={4} className="m-auto">
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             {/* Add more form fields for other user data */}
//             <Button variant="primary" type="submit">
//               Update Profile
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default UpdateProfile;

