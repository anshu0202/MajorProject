import { useState , useEffect , createContext , useContext } from "react";
const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
    const [teacherData, setTeacherData] = useState(null);

    useEffect(() => {
        let existingTeacher = localStorage.getItem("teacher");
        if (existingTeacher) {
            setTeacherData(JSON.parse(existingTeacher));

        }else{
            setTeacherData({
                teacherID : "teacherID",
                teacherName : "Dinesh",
                teacherEmail : "s4iXy@example.com",
                teacherImage : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                phone : 9414565899,


            });
        }
    } , []);


    return (
        <TeacherContext.Provider value={{ teacherData, setTeacherData }}>
            {children}
        </TeacherContext.Provider>
    )


}

const useTeacher = () => useContext(TeacherContext);

export { useTeacher , TeacherProvider };






    