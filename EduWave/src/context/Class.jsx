// import { useState , useEffect , createContext , useContext } from "react";
// const ClassContext = createContext();

// const ClassProvider = ({ children }) => {
//     const [classData, setClassData] = useState();

//     useEffect(() => {
//         let existingTeacher = localStorage.getItem("teacher");
//         if (existingTeacher) {
//             setClassData(JSON.parse(existingTeacher));

//         }else{
//             setClassData({
//                 teacherID : "teacherID",
//                 teacherName : "Dinesh",
//                 teacherEmail : "s4iXy@example.com",
//                 teacherImage : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//                 phone : 9414565899,


//             });
//         }
//     } , []);


//     return (
//         <ClassContext.Provider value={{ classData, setClassData }}>
//             {children}
//         </ClassContext.Provider>
//     )


// }

// const useTeacher = () => useContext(ClassContext);

// export { useTeacher , TeacherProvider };



    