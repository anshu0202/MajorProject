import React from 'react'

function UpdateProfile() {
  return (
    <div>
      this is update page
    </div>
  )
}

export default UpdateProfile





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

