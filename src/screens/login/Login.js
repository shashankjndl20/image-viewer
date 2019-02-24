import React, { Component } from 'react';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Input from '@material-ui/core/Input';
import indigo from '@material-ui/core/colors/indigo';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    card1: {
        maxWidth: '30%',
         marginTop: 18,
        margin: 'auto',
       
        padding: 50,
    },
   
   
    inputLabel: {
        '&$inputFocused': {
            color: indigo[500],
        },
    },
    logFm: {
        width: '100%',
        marginTop: 25,
    },
    inputFocused: {},
    inputUnderline: {
        '&:after': {
            borderBottomColor: indigo[500],
        },
    },
    
});

class Login extends Component {

    constructor() {
        super();
        sessionStorage.setItem('access-token', '11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2');
        // sessionStorage.removeItem('access-token');
        this.state = {
            Username: 'screw_you_thanos',
            Password: 'thaniosgay',
            logUname: '',
            usernameRequired: false,
            logPwd: '',
            passwordRequired: false,
            incorrectCredentials: false,
        }
    }


    inputUsernameChangeHandler = (event) => {
        this.setState({logUname: event.target.value})
    }

    inputPasswordChangeHandler = (event) => {
        this.setState({logPwd: event.target.value})
    }

    loginClickHandler = () => {
        this.state.logUname === '' ? this.setState({usernameRequired: true}) : this.setState({usernameRequired: false});
        this.state.logPwd === '' ? this.setState({passwordRequired: true}) : this.setState({passwordRequired: false});

        if (this.state.logUname && this.state.logPwd) {
            if (this.state.Username === this.state.logUname || this.state.Password === this.state.logPwd) {
                sessionStorage.setItem('access-token', '11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2');
                this.props.history.push('/home');
            } else {
                this.setState({incorrectCredentials: true})
            }
        }
    }

    render() {

        const { classes } = this.props;

        console.log(this.state);

        return (
            <div>

             
                <Header />
                <Card className={classes.card1}>
                    <CardContent>
                        <Typography variant='h4'>
                            LOGIN
                        </Typography>
                        <FormControl required className={classes.loginForm}>
                            <InputLabel
                                htmlFor='logUname'
                                classes={{
                                    root: classes.inputLabel,
                                    focused: classes.inputFocused,
                                }}
                            >
                                Username
                            </InputLabel>
                            <Input
                                id='logUname'
                                type='text'
                                loginusername={this.state.logUname}
                                classes={{
                                    underline: classes.inputUnderline,
                                }}
                                onChange={this.inputUsernameChangeHandler}
                            />
                            {this.state.usernameRequired ?
                                <FormHelperText error={true}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                                : ''
                            }
                        </FormControl>

                     
                        <form>
                        <FormControl required className={classes.logFm}>
                            <InputLabel
                                htmlFor='loginPassword'
                                classes={{
                                    root: classes.inputLabel,
                                    focused: classes.inputFocused,
                                }}
                            >
                                Password
                            </InputLabel>
                            <Input
                                autoComplete='off'
                                id='loginPassword'
                                type='password'
                                loginpassword={this.state.logPwd}
                                classes={{
                                    underline: classes.inputUnderline,
                                }}
                                onChange={this.inputPasswordChangeHandler}
                            />
                            {this.state.passwordRequired ?
                                <FormHelperText error={true}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                                : ''
                            }
                        </FormControl>
                        </form>

                        {this.state.incorrectCredentials ?
                            <FormControl>
                                <FormHelperText error={true}>
                                    <span className='red'>Incorrect username and/or password</span>
                                </FormHelperText>
                            </FormControl>
                            : ''
                        }

                        <br /><br />

                        <Button
                            className={classes.logBtn}
                            variant='contained'
                            color='primary'
                            onClick={this.loginClickHandler}
                        >
                            LOGIN
                        </Button>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
