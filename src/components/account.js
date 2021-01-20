import React, { Component, useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';

/// Styling preppad för backenden.
const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	locationText: {
		paddingLeft: '15px'
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	progess: {
		position: 'absolute'
	},
	uploadButton: {
		marginLeft: '8px',
		margin: theme.spacing(1)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	submitButton: {
		marginTop: '10px'
	}
});

///Hanterar accountsidan
function Account(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [uiLoading, setUiLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const [imageChange, setImageChange] = useState('');


	/// Alla funktioner som används för att skifta värden när saker laddas / ändras
	const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }
    const handleCountryChange = (event) => {
        setCountry(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value)
    }
    const handleUiLoading = (event) => {
        setUiLoading(event.target.value)
    }
    const handleButtonLoading = (event) => {
        setButtonLoading(event.target.value)
    }
    const handleImageError = (event) => {
        setImageError(event.target.value)
    }
    const handleErrorMsg = (event) => {
        setErrorMsg(event.target.value)
    }
    const handleImageChange = (event) => {
        setImageChange(event.target.files[0])
	};
	///Kontrollerar om du är authentiserad och avgör mot din token vad som ska visas.
    useEffect(() => {
        authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
                const {data: {userCredentials}} = response;
                console.log(response.data);
                
                setFirstName(userCredentials.firstName)
                setLastName(userCredentials.lastName)
                setEmail(userCredentials.email)
                setPhoneNumber(userCredentials.phoneNumber)
                setCountry(userCredentials.country)
                setUsername(userCredentials.username)
                setUiLoading(false)
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
                console.log(error);
                setErrorMsg('Error in retrieving the data')
			});

    },[]) 
	
	/// Ej färdig, ahft svårt att lösa image-typen.
	const profilePictureHandler = (event) => {
		event.preventDefault();
		setUiLoading(true)
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('image', props.image);
		form_data.append('content', props.content);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/user/image', form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
                console.log(error);
                setUiLoading(false)
                setImageError('Error in posting the data')
			});
	};
	///Hanterar uppdatering/ändringar av din profil och skickar tillbaka till databasen, om din token gått ut skickas du till loginsidan
	const updateFormValues = (event) => {
        event.preventDefault();
        setButtonLoading(true)
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
            firstName,
            lastName,
            country
        };
		axios
            .post('/user', formRequest)
			.then(() => {
                setButtonLoading(false)
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
				console.log(error);
				setButtonLoading(false)
			});
	};
///Sköter laddningsanimationen tills informationen hämtats från databasen, strukturen kommer från material-ui
const { classes, ...rest } = props;
		if (uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<CardContent>
							<div className={classes.details}>
								<div>
									<Typography className={classes.locationText} gutterBottom variant="h4">
										{firstName} {lastName}
									</Typography>
									<Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										startIcon={<CloudUploadIcon />}
										className={classes.uploadButton}
										onClick={profilePictureHandler}
									>
										Upload Photo
									</Button>
									<input type="file" onChange={handleImageChange} />
								{/* Om fel filformat dyker upp, visas nedan fel. Jag får fortfarande det så det ligger i backloggen. */}
									{imageError ? (
										<div className={classes.customError}>
											{' '}
											Wrong Image Format || Supported Format are PNG and JPG
										</div>
									) : (
										false
									)}
								</div>
							</div>
							<div className={classes.progress} />
						</CardContent>
						<Divider />
					</Card>

					<br />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<form autoComplete="off" noValidate>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="First name"
											margin="dense"
											name="firstName"
											variant="outlined"
											value={firstName}
											onChange={handleFirstNameChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											margin="dense"
											name="lastName"
											variant="outlined"
											value={lastName}
											onChange={handleLastNameChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email"
											margin="dense"
											name="email"
											variant="outlined"
											disabled={true}
											value={email}
											onChange={handleEmailChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Phone Number"
											margin="dense"
											name="phone"
											type="number"
											variant="outlined"
											disabled={true}
											value={phoneNumber}
											onChange={handlePhoneNumberChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="User Name"
											margin="dense"
											name="userHandle"
											disabled={true}
											variant="outlined"
											value={username}
											onChange={handleUsernameChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											variant="outlined"
											value={country}
											onChange={handleCountryChange}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions />
						</form>
					</Card>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						className={classes.submitButton}
						onClick={updateFormValues}
						disabled={
							buttonLoading ||
							!firstName ||
							!lastName ||
							!country
						}
					>
						Save details
						{buttonLoading && <CircularProgress size={30} className={classes.progess} />}
					</Button>
				</main>
			);
		}
	}
// }

export default withStyles(styles)(Account);