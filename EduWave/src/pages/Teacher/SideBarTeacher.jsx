
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import GradeIcon from '@mui/icons-material/Grade';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import Course from './Courses/Course';
import Footer from '../../components/Layout/Footer';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import Assignment from './Assignments/UploadAssignment';
import { Route, Routes, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import './SideBar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBarTeacher() {

    let {title} = useParams();
    const navigate = useNavigate();
    const arr =
        [
            // {
            //   name:'Start Live Class',
            //  icon:<VideoCameraFrontIcon  style={{color:"white"}} />,
            //  link:"/teacherDashboard/JoinClass"
            // },
            { name:'Classes',
              icon:<VideoCameraFrontIcon style={{color:"white"}}/>,
              link:"/teacherDashboard/classes"}, 
            // { name:'Attendance',
            //   icon:<AssessmentIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/Attendance"}
            ,
            { name:'Assignment',
              icon:<AssignmentIcon style={{color:"white"}}/>,
              link:"/teacherDashboard/assignmentUpload"}
              ,
            // { name:'',
            //   icon:<QuizIcon style={{color:"white", display:"none"}}/>,
            //   link:"/teacherDashboard/Test"}
              ,
              { name:'Upload-Notes',
              icon:<QuizIcon style={{color:"white"}}/>,
              link:"/teacherDashboard/noteUpload"},
              { name:'Upload-PYQS',
              icon:<QuizIcon style={{color:"white"}}/>,
              link:"/teacherDashboard/pyqUpload"},

              // { name:'',
              // icon:<QuizIcon style={{color:"white"}}/>,
              // link:"/room/:roomID"}
             

            // { name:'Course Material',
            //   icon:<DescriptionIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/Notes"},
            // { name:'Calendar',
            //   icon:<CalendarMonthIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/Schedule"},
            // { name:'Announcements',
            //   icon:<CircleNotificationsIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/Announcements"},
            // { name:'Grades',
            //   icon:<GradeIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/Grades"},
            // { name:'Help & Support',
            //   icon:<InfoIcon style={{color:"white"}}/>,
            //   link:"/teacherDashboard/HelpAndSupport"}
        ]
    


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




   const [anchorEl, setAnchorEl] = React.useState(null);
  const opendropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/login");




  };

  const handleDash = ()=>{
    navigate("/teacherDashboard")
  }

  return (
    <div style={{display:"flex",flexDirection:"column",margin:"20px",minHeight:"100vh",paddingTop:"15vh"}}>
    <Box sx={{ display: 'flex' }} style={{zIndex:1,flex:1 }} >
      <CssBaseline  />
      <AppBar position="fixed" open={open} style={{ background: "linear-gradient(303deg, rgba(182, 51, 118, 1) 0%, rgba(29, 15, 74, 1) 44%)", }}>
        <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{cursor:"pointer"}}
            sx={{

              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{cursor:"pointer"}} onClick={handleDash} variant="h6" noWrap component="div">
            {title==undefined ? "Teacher Dashboard" : title}
            {/* {title} */}
          </Typography>
          <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHoHXWaNoXKuhTQ8j3eV-NxoCOxrpOfXEYwpg3gF-vMw&s" alt="" onClick={handleClick} style={{height:"30px",width:"30px",borderRadius:"50%"}} />
        </Toolbar>
        <Menu
          style={{cursor:"pointer"}}
        anchorEl={anchorEl}
        id="account-menu"
        open={opendropdown}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <Link to="/studentDashboard/Profile" style={{textDecoration:"none",color:"black"}}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
      </Link>
      <Link to="/studentDashboard/UpdateProfile" style={{textDecoration:"none",color:"black"}}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Update
        </MenuItem>
      </Link>
        <Divider />
    
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
       
      </Menu>
        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHoHXWaNoXKuhTQ8j3eV-NxoCOxrpOfXEYwpg3gF-vMw&s" alt="" style={{float:"right",height:"30px",width:"30px",borderRadius:"50%"}} /> */}
      </AppBar>
      {/* <div > */}

     
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ background: 'linear-gradient(303deg, rgba(182, 51, 118, 1) 0%, rgba(29, 15, 74, 1) 44%)', color: "white" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"white"}}/> : <ChevronLeftIcon style={{color:"white"}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ background: 'linear-gradient(303deg, rgba(182, 51, 118, 1) 0%, rgba(29, 15, 74, 1) 44%)',height:"100vh", color: "white" }}>
          {arr.map((text,index) => (
            <Link to={text.link} style={{textDecoration:"none" }} >
            <ListItem key={index} disablePadding sx={{ display: 'block',}}>
            
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
              <OverlayTrigger
                    style={{background:"black",color:"white",zIndex:3}}
                    placement="right"
                    delay={{ show: 250, hide: 100 }}
                    overlay={ <Tooltip id="button-tooltip" style={{background:"linear-gradient(303deg, rgba(182, 51, 118, 1) 0%, rgba(29, 15, 74, 1) 44%)",border:"1px solid white",borderRadius:"25px",padding:"10px",width:"7rem",color:"white",zIndex:3,marginLeft:"10px"}}>{text.name} </Tooltip>}
                  >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text.icon}
                  {/* {text.icon} */}
                  {/* <ClassIcon style={{color:"white"}}/>
                  <AssessmentIcon style={{color:"white"}}/>
                  <AssignmentIcon style={{color:"white"}}/>
                  <CalendarMonthIcon style={{color:"white"}}/> */}
                </ListItemIcon>
                </OverlayTrigger>
                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 ,textDecorationLine:"none",textDecoration:"none",color:"white"}} />
                {/* </Link> */}
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        {/* <Divider style={{backgroundColor:"aqua"}} /> */}
        
        </Drawer>
        {/* </div> */}
      {/* <Box component="main" sx={{ p: 3}}>
        <DrawerHeader />
       
      </Box> */}
      <Outlet />
    </Box>
   
    
    <div className='footer'>
    {/* <Footer/> */}
    </div>
    
    

    </div>
  );
}
