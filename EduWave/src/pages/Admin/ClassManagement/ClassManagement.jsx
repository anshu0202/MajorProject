
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createNewClass, createNewSubject, getAllClassesList, getAllSubjects, getAllTeacherList, getSubjectById } from '../../../service/AdminApi';
import { toast, ToastContainer } from 'react-toastify';


const ClassManagement = () => {
    const [subjects, setSubjects] = useState([]);

    const [className, setClassName] = useState("");
    const [desc, setDesc] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [teacherList, setTeacherList] = useState([]);
    const [classList , setClassList] = useState([]);
    const [selectedSubjects , setSelectedSubjects] = useState([]);
    const [selectedClass , setSelectedClass] = useState(null);
    const [ selectedSubject     , setSelectedSubject] = useState(null);


    const [selectedSubjectsList, setSelectedSubjectsList] = useState([]);

    const handleClassChange = (e) => {
        setClassName(e.target.value);
    };

    const handleSubjectChange = (selectedSubject, action) => {

        


        if (action === 'add') {
            // Check if the subject is not already in the array before adding
            if (!selectedSubjects.includes(selectedSubject)) {
                setSelectedSubjects([...selectedSubjects, selectedSubject]);
            }
        } else if (action === 'remove') {
            const updatedSubjects = selectedSubjects.filter(
                (subject) => subject !== selectedSubject
            );
            setSelectedSubjects(updatedSubjects);
        }
    };

    const SelectedSubject = (sub) => {

        console.log("this is selected subject-- >" , sub);
        try {
            
            
            if(selectedClass===null){
                toast.error("Please Select Class");
                return;
            }
    
            setSelectedSubject(sub);

            
        } catch (error) {
            console.log("Erro in getting data in frontEnd --> ", error);
            toast.error("Something Went Wrong");
        }
        


    };

    const getClassList =  async() =>{


        try {

            const res = await getAllClassesList();
            console.log("this is getting All Classes LIST -->", res?.data);
            setClassList(res?.data);
            
        } catch (error) {
                console.log("Erro in getting data in frontEnd --> ", error);
        }
    } 

    const getAllTeachersLis = async () => {
        try {
    
          const res = await getAllTeacherList();
          setTeacherList(res?.data);
    
        } catch (error) {
          console.log("Erro in getting data in frontEnd --> ", error);
        }
      }


    const getAllSubjectsList = async () => {
        try {
            const data = await getAllSubjects();
            // console.log("this is getting All Subjects data-->", data?.data);
            setSubjects(data?.data);

        } catch (error) {
            console.log("Erro in getting data in frontEnd --> ", error);

        }
    }


    const handleCreateClass = async () => {
        try {

            if (className === "") {
                toast.error("Please Enter Class Name");
                return;
            }


            const res = await createNewClass({
                className,
                subjectList: selectedSubjects

            })
            if (res?.status === 201) {
                toast.success("Class Created Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });
                setClassName("");
                setSelectedSubjects([]);
            }






        } catch (error) {
            console.log("Error in creating class --> ", error);


        }
    }

    const handleCreateSubject = async () => {
        try {

            if (subjectName === "") {
                toast.error("Please Enter Subject Name");
                return;
            }
            if (desc === "") {
                toast.error("Please Enter Subject Description");
                return;
            }



            const res = await createNewSubject({
                subjectName,
                description: desc
            })

            if (res?.status === 201) {
                toast.success("Subject Created Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });
                setSubjectName("");
                setDesc("");
                getAllSubjectsList();
            }


        } catch (error) {
            console.log("Error in creating subject --> ", error);
        }
    }


    const getAllClasses = async () => {
        try {
            const res = await getAllClassesList();
            console.log("All classes List in front -->", res);

        } catch (error) {
            console.log("Error in creating subject --> ", error);

        }
    }

    const handleSelectedSubject = async (data) => {
        try {
            setSelectedClass(data);
            const subjectIds = data.subjectList.map(subject => subject._id);
    
            const selectedSubjects = await Promise.all(subjectIds.map(async (subjectId) => {
                try {
                    // Assuming getSubjectById is an asynchronous function
                    const subject = await getSubjectById(subjectId);
                    return subject;
                } catch (error) {
                    // Handle error for individual subject retrieval
                    console.error(`Error fetching subject with ID ${subjectId}:`, error);
                    return null;
                }
            }));
            
            console.log('Selected Subjects:', selectedSubjects);
            setSelectedSubjectsList(selectedSubjects);
    
            // Now you can use the selectedSubjects array as needed
    
        } catch (error) {
            // Handle the main try-catch block error
            console.error('Error in handleSelectedSubject:', error);
        }
    };
    
    // Assuming getSubjectById is an asynchronous function
    // const getSubjectById = async (subjectId) => {
    //     // Implement the logic to fetch subject by ID here
    //     // For example, you can use an API call or retrieve from a database
    //     // Return the subject object
    //     return { _id: subjectId, /* Other properties */ };
    // };
    


    

    useEffect(() => {
        getClassList();
        getAllTeachersLis();
        getAllClasses();
        getAllSubjectsList();
    }, [])

    return (
        <div className="container">
            <Row className="justify-content-center p-3 gap-3">
                <Col md={5} style={{backgroundColor: '#e5e5e6', borderRadius: '10px'}}>
                    <h1 className="text-center">Create Class</h1>
                    <Form>
                        <Form.Group controlId="className">
                            <Form.Control
                                type="text"
                                placeholder="Enter class name"
                                value={className}
                                onChange={handleClassChange}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3 mb-3" controlId="subject">
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" // Updated class for Bootstrap 5
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Select Subjects
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {subjects?.map((subject, index) => (
                                        <div
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => handleSubjectChange(subject, 'add')}
                                        >
                                            {subject?.subjectName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Form.Group>

                        {selectedSubjects.length > 0 ?
                            <>
                                <SubjectTable
                                    style={{ marginTop: '2rem' }}
                                    selectedSubjects={selectedSubjects}
                                    handleSubjectChange={handleSubjectChange}
                                />

                                <Button onClick={handleCreateClass} className='mt-3'>
                                    Save Class
                                </Button>
                            </>
                            :
                            <>
                                <p className="text-center">No Subjects Selected</p>
                            </>}



                    </Form>
                </Col>
                <Col md={5} style={{backgroundColor: '#e5e5e6', borderRadius: '10px'}}>
                    <h1 className="text-center">Create Subject</h1>
                    <Form>
                        <Form.Group controlId="className">
                            <Form.Control
                                type="text"
                                placeholder="Enter Subject name"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                type="text"
                                placeholder="Enter Subject Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Form.Group>

                        <Button onClick={handleCreateSubject} className='mt-3'>
                            Create Subject
                        </Button>


                    </Form>
                </Col>

                <Col className='mt-3' style={{backgroundColor: '#e5e5e6', borderRadius: '10px' , padding: '1rem' , width: '85%'}} md={6}>
                    <h1 className="text-center"> Class Allocatation</h1>
                    <Form>
                  
                        <div className='mt-3 d-flex flex-row p-3 gap-5 justify-content-center ' style={{backgroundColor: '#e5e5e6', borderRadius: '10px'}}>


                            <Form.Group className="mt-3 mb-3 " controlId="subject">
                                <div className="dropdown ">
                                    <button
                                        className="btn btn-secondary dropdown-toggle p-2"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" // Updated class for Bootstrap 5
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Select Teacher
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {teacherList?.map((teacher, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => handleSubjectChange(teacher, 'add')}
                                            >
                                                {teacher?.firstName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mt-3 mb-3" controlId="subject">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle p-2"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" // Updated class for Bootstrap 5
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Select Class
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {classList?.map((cname, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => handleSelectedSubject(cname)}

                                            >
                                                {cname?.className}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mt-3 mb-3" controlId="subject">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle p-2"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" // Updated class for Bootstrap 5
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Select Subject
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {selectedSubjectsList?.map((subject, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => SelectedSubject(subject)}
                                            >
                                                {subject?.data?.subjectName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Form.Group>
                        </div>

                        {selectedSubjects.length > 0 ?
                            <>
                                <SubjectTable
                                    style={{ marginTop: '2rem' }}
                                    selectedSubjects={selectedSubjects}
                                    handleSubjectChange={handleSubjectChange}
                                />

                                <Button onClick={handleCreateClass} className='mt-3'>
                                    Save Class
                                </Button>
                            </>
                            :
                            <>
                                <p className="text-center">No Subjects Selected</p>
                            </>}



                    </Form>
                </Col>
                {/* show all class list here */}
                {/* <h1 className="text-center mt-5">All Classes</h1>
            <Row className="mt-3">
                {allClasses?.map((classItem, index) => (
                    <Col key={index} md={6}>
                        <h2 className="text-center">{classItem.className}</h2>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id={`dropdownMenuButton-${index}`}
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Subjects
                            </button>
                            <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                {classItem.subjectList.map((subject, subjectIndex) => (
                                    <div key={subjectIndex} className="dropdown-item">
                                        {subject.subjectName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row> */}
            </Row>

            <ToastContainer />
        </div>
    );
};

const SubjectTable = ({ selectedSubjects, handleSubjectChange }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='text-center'>Subject</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                {selectedSubjects.map((subject, index) => (
                    <tr key={index}>
                        <td className='text-center'>{subject?.subjectName}</td>
                        <td className='text-center'>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleSubjectChange(subject, 'remove')}
                            >
                                Remove
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ClassManagement;
