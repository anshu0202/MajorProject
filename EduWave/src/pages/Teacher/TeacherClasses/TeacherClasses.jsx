import React, { useEffect, useState } from 'react'
import { classList, getClasstById, getSubjectById } from '../../../service/AdminApi'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { startLiveClass } from '../../../service/TeacherApi';
import { toast , ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TeacherClasses = () => {

    const [selectedSubjectsList, setSelectedSubjectsList] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [classListInfo, setClassListInfo] = useState([]);
    const classesList = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // const classesList = JSON.parse(localStorage.getItem('auth'));
            const assignedClasses = classesList.assignedClasses;

            const results = await Promise.all(
                assignedClasses.map(async (classInfo) => {
                    try {
                        const subjectId = classInfo.subject;
                        const classId = classInfo.class;
                        // console.log("Class info" , classInfo);

                        const subject = await getSubjectById(subjectId);
                        const classData = await getClasstById(classId);

                        // Assuming you have a structure for the result object
                        return { subject, class: classData };
                    } catch (error) {
                        console.error('Error fetching subject or class:', error);
                        return null;
                    }
                })
            );

            setClassListInfo(results);
            console.log('Fetched Data:', results);
            setSelectedSubjectsList(results.filter(Boolean)); // Filter out null results
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    };

    const handleStartClass = async(data)=>{
        try {

            // console.log("this is data in habdle Start live-->" , data);
            const teacherIDDD = classesList._id;
            const dataInfo = {
                classId : data?.class?.data?._id,
                subjectId : data?.subject?.data?._id,
                teacherId : teacherIDDD
            }

            
            
            
            const res = await startLiveClass(dataInfo);
            
            // console.log("Data info to resssssssssssssssssss" , res);

            if(res?.success===true){
                setTimeout(() => {
                   
                    navigate(`/room/${teacherIDDD}`);
                }, 2000);
                // navigate("/teacherDashboard/JoinClass")
               
                 toast.success("Live class will start soon..");
            }


            
        } catch (error) {
            
        }
    }


    useEffect(() => {


        fetchData();
    }, []); // Run only once when the component mounts





    return (
        <>
            <Row className="justify-content-center p-1 gap-3 m-auto mt-0">
                <Col  style={{ backgroundColor: '#e5e5e6', borderRadius: '10px', padding: '1rem', width: '85%' }} md={6}>
                    <h1 className="text-center"> Class List</h1>
                    <ClassListTable ClassList={classListInfo   } handleStartClass={handleStartClass} />
                </Col>






            </Row>




        <ToastContainer/>
        </>
    )
}


const ClassListTable = ({ ClassList , handleStartClass  }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='text-center align-center'>Class Name</th>
                    <th className='text-center'>Subject </th>
                    <th  className='text-center align-items-center'>Description</th>
                    <th className='text-center'>Start Class</th>
                </tr>
            </thead>
            <tbody>
                {ClassList?.map((aList, index) => (
                    <tr key={index}>
                        <td className='text-center'>{aList?.class?.data?.className}</td>
                        <td className='text-center'>{aList?.subject?.data?.subjectName}</td>
                        <td className='text-center'>{aList?.subject?.data?.description}</td>
                        <td className='text-center'>
                            <Button
                                size="sm"
                                
                                style={{padding: "5px " , width:"100%"}}
                                onClick={() => handleStartClass(aList)}
                            >
                                Start 
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TeacherClasses