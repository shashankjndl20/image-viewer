import React, { Component } from 'react';



class Profile extends Component {

    constructor() {
        super();
        this.state = {
            accessToken: localStorage.getItem('access-token'),
            profilePictureUrl: '',
            open: false
        }
    }

    handleToggle = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({open: false});
    };

    myAccountHandler = (e) => {
        // handleClose
        this.handleClose(e);

        // redirect to profile page
        this.props.myAccountHandler();
    }

    logoutHandler = (e) => {
        // handleClose
        this.handleClose(e);

        // clear session storage and redirect to login page
        this.props.logoutHandler();
    }

    render() {
        const {open} = this.state;

        return (
            <div>
                <header >
                Profile
                   
                </header>
            </div>
        )
    }
}

export default Profile;
