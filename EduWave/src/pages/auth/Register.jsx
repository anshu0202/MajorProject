import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Form } from 'react-bootstrap';



// import { toast, ToastContainer } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { json, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { newStudentRegister, newTeacherRegister, Register } from '../../service/StudentApi';

import { InputLabel, MenuItem, Select } from '@mui/material';
import { getAllClassesList } from '../../service/AdminApi';
// import loginGif from "./img/login.gif";
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://anshuverma.co">
                Education Wave
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();
export default function SignUp() {

    const navigate = useNavigate();

    const [fname, setFName] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(null);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    // const [answer, setAnswer] = useState("");
    const [classList , setClassList] = useState([]);
    const [classObj,setClassObj]=useState(null);

    const [course, setCourse]=useState(null);


    const getClassList =  async() =>{


        try {

            const res = await getAllClassesList();
            // console.log("this is getting All Classes LIST -->", res?.data);
            setClassList(res?.data);
            
        } catch (error) {
                console.log("Erro in getting data in frontEnd --> ", error);
        }
    } 
    React.useEffect(()=>{
        getClassList();
    },[])


    const handleClass =  (data) => {
       
            setClassObj(data);
            // setCourse(data.className)
    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        // console.log(data);

        if(role==1){
            if(classObj===null){
                toast.error("Select course");
                return 
            }
    
            const data = {
                fname: fname,
                email: email,
                password: password,
                lname: lname,
                role: role,
                classId:classObj?._id
            }

            const res = await newStudentRegister(data);
        // console.log("res in register page main ", res);
        if (res.success) {
            toast.success(res.message);
            // localStorage.setItem("user", JSON.stringify(res?.student));
            setTimeout(() => {

                // navigate("/login");
            }, 2000);

        } else {
            toast.error(res.message);
        }



        }else{
            
    
            const data = {
                fname: fname,
                email: email,
                password: password,
                lname: lname,
                role: role,
            }
            const res = await newTeacherRegister(data);
        console.log("res in register page main ", res);
        if (res.success) {
            toast.success(res.message);
            // localStorage.setItem("user", JSON.stringify(res?.student));
            setTimeout(() => {
                // navigate("/login");
            }, 2000);

        } else {
            toast.error(res.message);
        }




        }




        // const res = await Register(data);
        // console.log("res in register page main ", res);
        // if (res.success) {
        //     toast.success(res.message);
        //     // localStorage.setItem("user", JSON.stringify(res?.student));
        //     setTimeout(() => {

        //         navigate("/login");
        //     }, 2000);

        // } else {
        //     toast.error(res.message);
        // }


    }

    const boxStyle = {
        border: "20px solid red",
    }

    return (
        <main-container >
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up to Education Wave👋
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={fname}
                                    onChange={(e) => setFName(e.target.value)}
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    id="name"
                                    label="Last Name "
                                    name="lname"
                                    autoComplete="lastname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select 
                                    style={{ width: "100%" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="role"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    
                                    <MenuItem value={1}>Student</MenuItem>
                                    <MenuItem value={2}>Teacher</MenuItem>
                                    
                                </Select>
                            </Grid>
                            {
                                role===1?<>
                                <Grid className="mt-3 mb-3" controlId="subject">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle p-2"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" // Updated class for Bootstrap 5
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Select Course
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {classList?.map((cname, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => handleClass(cname)}

                                            >
                                                {cname?.className}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                                </>:<></>
                            }
                            {/* {
                                classObj===null && role!==1?<></>:<>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={classObj.className}
                                    // onChange={(e) => setLname(e.target.value)}
                                    id="course"
                                    label="course"
                                    name="course"
                                    // autoComplete="lastname"
                                />
                            </Grid>
                                </>
                            } */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    aria-readonly
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    name="username"
                                    label="Enter Your Username"
                                    type="text"
                                    id="exampleInputUsername"
                                    autoComplete="username"
                                />
                            </Grid> */}
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    fullWidth
                                    label="What is your favourite sports?"
                                    type="text"
                                    id="exampleInputgame"
                                    autoComplete="game"
                                />
                            </Grid> */}

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* </ThemeProvider> */}
            <ToastContainer />
        </main-container>
    );
}