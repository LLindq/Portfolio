import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import Account from '../components/account';
import Todo from '../components/todo';
import Blog from '../components/blog';
import Resume from './resume';
import About from './about';
import Dashboard from '.';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authMiddleWare } from '../util/auth'

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

function Admin(props) {
    const [render, setRender] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [uiLoading, setUiLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [imageLoading, setimageLoading] = useState(false);
    const [renderPage, setRenderPage] = useState(<Account/ >);


    const loadAccountPage = (event) => {
        setRenderPage(<Account />)
    }

    const loadDashboardPage = (event) => {
        setRenderPage(<Dashboard />)
    }

    const loadAboutPage = (event) => {
        setRenderPage(<About />)
    }

    const loadResumePage = (event) => {
        setRenderPage(<Resume />)
    }

    const loadBlogPage = (event) => {
        setRenderPage(<Blog />)
    }
	
    const loadTodoPage = (event) => {
        setRenderPage(<Todo />)
    }
	
    const logoutHandler = (event) => {
        localStorage.removeItem('AuthToken');
        props.history.push('/login');
    }
    
    useEffect(() => {
   		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
                console.log(response.data + '123');

				const {data: {userCredentials}} = response;
                setFirstName(userCredentials.firstName)
                setLastName(userCredentials.lastName)
                setEmail(userCredentials.email)
                setPhoneNumber(userCredentials.phoneNumber)
                setCountry(userCredentials.country)
                setUsername(userCredentials.username)
                setUiLoading(false)
                setProfilePicture(userCredentials.imageUrl)
				})
			
			.catch((error) => {
				if(error.response.status === 403) {
					props.history.push('/login')
				}
                console.log(error);
                setErrorMsg('Error in retrieving the data')
			});
	},[])  
    

		const { classes } = props;		
		if (uiLoading === true) {
			return (
				<div className={classes.root}>
					{uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" noWrap>
								TodoApp
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.toolbar} />
						<Divider />
						<center>
							<Avatar src={profilePicture} className={classes.avatar} />
							<p>
								{' '}
								{firstName} {lastName}
							</p>
						</center>
						<Divider />
						<List>
                        {/* <ListItem button key="Home" onClick={loadDashboardPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem> */}
                            {/* <ListItem button key="About" onClick={loadAboutPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="About" />
							</ListItem> */}
                            {/* <ListItem button key="Resume" onClick={loadResumePage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Resume" />
							</ListItem> */}
                            {/* <ListItem button key="Todo" onClick={loadTodoPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Todo" />
							</ListItem> */}

                            <ListItem button key="Blog" onClick={loadBlogPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Blog" />
							</ListItem>

							<ListItem button key="Account" onClick={loadAccountPage}>
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>

							<ListItem button key="Logout" onClick={logoutHandler}>
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>
                    <div>{renderPage}</div>
				</div>
			);
		}
	}

export default withStyles(styles)(Admin);
