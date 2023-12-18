
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import loginGif from "../../assets/img/login.gif";
import { studentLogin } from '../../service/StudentApi';
import { teacherLogin } from '../../service/TeacherApi';
import { useAuth } from '../../context/User';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { InputLabel, MenuItem, Select } from '@mui/material';



function Copyright(props) {
  
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://laxmikant.co">
                Education Wave
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    const {auth , setAuth} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // const [auth, setAuth] = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data  = {
            email : email,
            password : password
        }

        // console.log("data in login -->", data);

        if(role=== 1){

            const res = await studentLogin(data);

            if(res?.success === false){
                // console.log("this is for sjdgfsadfd teahcer ---> ");
                toast.error(res?.message);

                return ;
            }
            // console.log("this is teststststt ---> " , res);
            if (res.success) {
                toast.success("Login Successfully");
                localStorage.setItem("auth", JSON.stringify(res?.student));
                localStorage.setItem("token", JSON.stringify(res?.token));
    
                setTimeout(() => {
                    
                    navigate("/studentDashboard");
                }, 2000);
    
                
                setAuth({
                    user: res?.student,
                    token: res?.token
                });
                
    
            }



        }else{
            const res = await teacherLogin(data);


            // console.log("this is for teahcer ---> " , res);
            if(res?.success === false){
                // console.log("this is for sjdgfsadfd teahcer ---> ");
                toast.error(res?.message);

                return ;
            }
            if (res?.success) {
                toast.success("Login Successfully");
                localStorage.setItem("auth", JSON.stringify(res?.teacher));
                localStorage.setItem("token", JSON.stringify(res?.token));
    
                setTimeout(() => {
                    
                    navigate("/teacherDashboard");
                }, 2000);
    
                
                setAuth({
                    user: res?.teacher,
                    token: res?.token
                });
                
    
            }
        }







    }
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: `url(${loginGif})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            // backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                         
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            {/* <GoogleOAuthProvider clientId="195337239909-bpjg0qe850h5n4npsfk8r969ki2f89u6.apps.googleusercontent.com">
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        var decoded = jwt_decode(credentialResponse.credential);
                                        localStorage.setItem("google", JSON.stringify(decoded));

                                        console.log(decoded);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />;
                            </GoogleOAuthProvider>; */}
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
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
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/forgot-password" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
            <ToastContainer />
        </>
    );
}