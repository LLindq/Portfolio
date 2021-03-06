import React, { Component, useEffect, useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';


const styles = (theme) => ({

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,

	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Todo(props) {
    const [todos, setTodos] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [todoId, setTodoId] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const [uiLoading, setUiLoading] = useState(true);
    const [buttonType, setButtonType] = useState('');
    const [viewOpen, setViewOpen] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleBodyChange = (event) => {
        setBody(event.target.value)
    }

    useEffect(() => {
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
                setTodos(response.data)
                setUiLoading(false)
			})
			.catch((err) => {
				console.log(err);
			});
    },[])  

	const deleteTodoHandler = (todo) => {
        console.log(todo)
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const {todoId} = todo;
		axios
			.delete(`todo/${todoId}`)
			.then((response) => {
                console.log(response)
                ///Work in progress, state ist~ :-D
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const handleEditClickOpen = (todo) => {
        setTitle(todo.title)
        setBody(todo.body)
        setTodoId(todo.todoId)
        setButtonType('Edit')
        setOpen(true)
	}

	const handleViewOpen = (todo) => {
        setTitle(todo.title)
        setBody(todo.body)
        setViewOpen(true)
	}


    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        viewRoot: {
            padding: theme.spacing(2)
        }
    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    const { classes } = props;
    // const { open, errors, viewOpen } = state;
    ///Behöver jag dessa?!?!?!
    const handleClickOpen = () => {
        setTodoId('')
        setTitle('')
        setBody('')
        setButtonType('')
        setOpen(true)
    };

    const handleSubmit = (event) => {
        authMiddleWare(props.history);
        event.preventDefault();
        const userTodo = {
            title,
            body,
        };
        let options = {};
        if (buttonType === 'Edit') {
            options = {
                url: `/todo/${todoId}`,
                method: 'put',
                data: userTodo
            };
        } else {
            options = {
                url: '/todo',
                method: 'post',
                data: userTodo
            };
        }
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
        .then(() => {
            setOpen(false)
            window.location.reload();
        })
        .catch((error) => {
            setOpen(true)
            setErrors(error.response.data)
            // this.setState({ open: true, errors: error.response.data });
            console.log(error);
        });
    };

    const handleViewClose = () => {
        setViewOpen(false)
    };

    const handleClose = (event) => {
        setOpen(false)
    };

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

                <IconButton
                    className={classes.floatingButton}
                    color="primary"
                    aria-label="Add Todo"
                    onClick={handleClickOpen}
                >
                    <AddCircleIcon style={{ fontSize: 60 }} />
                </IconButton>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
                            </Typography>
                            <Button
                                autoFocus
                                color="inherit"
                                onClick={handleSubmit}
                                className={classes.submitButton}
                            >
                                {buttonType === 'Edit' ? 'Save' : 'Submit'}
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="todoTitle"
                                    label="Todo Title"
                                    name="title"
                                    autoComplete="todoTitle"
                                    helperText={errors.title}
                                    value={title}
                                    error={errors.title ? true : false}
                                    onChange={handleTitleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="todoDetails"
                                    label="Todo Details"
                                    name="body"
                                    autoComplete="todoDetails"
                                    multiline
                                    rows={25}
                                    rowsMax={25}
                                    helperText={errors.body}
                                    error={errors.body ? true : false}
                                    onChange={handleBodyChange}
                                    value={body}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Dialog>

                <Grid container spacing={2}>
                    {todos.map((todo) => (
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {todo.title}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {dayjs(todo.createdAt).fromNow()}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {`${todo.body.substring(0, 65)}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleViewOpen( todo )}>
                                        {' '}
                                        View{' '}
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => handleEditClickOpen( todo )}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => deleteTodoHandler( todo )}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Dialog
                    onClose={handleViewClose}
                    aria-labelledby="customized-dialog-title"
                    open={viewOpen}
                    fullWidth
                    classes={{ paperFullWidth: classes.dialogeStyle }}
                >
                    <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
                        {title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            fullWidth
                            id="todoDetails"
                            name="body"
                            multiline
                            readonly
                            rows={1}
                            rowsMax={25}
                            value={body}
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </main>
        );
    }
}
	



export default (withStyles(styles)(Todo));