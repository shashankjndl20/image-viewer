import React, { Component } from 'react';
import './home.css';
import Header from '../../common/header/Header';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {GridList, GridListTile} from '@material-ui/core';
import axios from "axios"
import GridListCard from './../../components/GridListCard';

class Home extends Component {

    constructor() {
        super();
        localStorage.setItem('access-token', '11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2');
        // sessionStorage.removeItem('access-token');
        this.state = {
            userPosts: [],
            userInfo: {},
            filteredUserPosts: [],
            userComments: {},
            likesState: {},
        }
    }

    componentWillMount() {
        let that = this;

        // Get information about the owner of the access_token.
        let dataUserInfo = null;
       
        axios.get(`${this.props.baseUrl}?access_token=${localStorage.getItem('access-token')}`).then((response)=>{
         
            that.setState({
                userInfo: response.data.data
            })
        })

        let dataUserPosts = null;
    
        axios.get(`${this.props.baseUrl}media/recent/?access_token=${localStorage.getItem('access-token')}`).then((response)=>{
            let likesState = {};
                let userComments = {};
                let data = response.data.data
                for (let i = 0; i < data.length; i++) {
                    likesState[data[i]['id']] = false
                    userComments[data[i]['id']] = {'added': [], 'toAdd': ''}
                }
                that.setState({
                    userPosts: data,
                    filteredUserPosts: data,
                    likesState: likesState,
                    userComments: userComments
                });
        })
    }

    timeReshape(unixTimestamp) {

        // created_time which is unix timestamp multiplied by 1000 so that the time is in milliseconds, not seconds
        let dateObject = new Date(unixTimestamp * 1000);
        let timeDict = {
            date: dateObject.getDate(),
            month: dateObject.getMonth() + 1,
            year: dateObject.getFullYear(),
            hours: dateObject.getHours(),
            minutes: dateObject.getMinutes(),
            seconds: dateObject.getSeconds()
        }

        // prepend 0 to single digits
        let timeKeys = Object.keys(timeDict);
        for (var i = 0; i < timeKeys.length; i++) {
            let timeValue = timeDict[timeKeys[i]];
            timeDict[timeKeys[i]] = timeValue < 10 ? '0' + timeValue : timeValue;
        }
        return `${timeDict.date}/${timeDict.month}/${timeDict.year} ${timeDict.hours}:${timeDict.minutes}:${timeDict.hours}`;
    }

    goToProfile = () => {
        // redirect to profile page
        this.props.history.push('/profile');
    }

    logoutHandler = () => {
        // clear session storage
        sessionStorage.clear();

        // redirect to login page
        this.props.history.push("/");
    }

    searchHandler = (event) => {
        let resultPosts = this.state.userPosts.filter(function (post) {
            return post.caption!==null?post.caption.text.split('\n')[0].toLowerCase().includes(event.target.value.toLowerCase()):null;
        });
        this.setState({ filteredUserPosts: resultPosts });
    }

    toggleLike(postId, likeState) {
        let newUserPosts = Object.assign({}, this.state.userPosts);
        let count = null;
        for (let i = 0; i < Object.keys(newUserPosts).length; i++) {
            if (newUserPosts[i]['id'] === postId) {
                if (likeState) {
                    count = newUserPosts[i].likes.count + 1
                    newUserPosts[i].likes.count = count;
                    // console.log(newUserPosts[i].likes.count)
                } else {
                    count = newUserPosts[i].likes.count - 1;
                    newUserPosts[i].likes.count = count;
                    // console.log(newUserPosts[i].likes.count)
                }
                break;
            }
        }

        let newFilteredUserPosts = Object.assign({}, this.state.filteredUserPosts);
        for (let i = 0; i < Object.keys(newFilteredUserPosts).length; i++) {
            if (newFilteredUserPosts[i]['id'] === postId) {
                newFilteredUserPosts[i].likes.count = count;
                // console.log(count)
                break;
            }
        }

        let newLikesState = Object.assign({}, this.state.likesState);
        newLikesState[postId] = likeState;
        this.setState({
            userPosts: Object.values(newUserPosts),
            filteredUserPosts: Object.values(newFilteredUserPosts),
            likesState: newLikesState,
        });
    }

    likeHandler = (postId) => {
        if (this.state.likesState[postId]) {
            // decrement like
            this.toggleLike(postId, false);
        }
        else {
            // increment like
            this.toggleLike(postId, true);
        }
    }

    commentInputChange = (userComment, postId) => {
        let newUserComments = Object.assign({}, this.state.userComments);
        newUserComments[postId]['toAdd'] = userComment;
        this.setState({userComments: newUserComments});
    }

    addComment = (id) => {
        if (this.state.userComments[id]['toAdd']) {
            let newUserComments = Object.assign({}, this.state.userComments);
            newUserComments[id]['added'].push(newUserComments[id]['toAdd']);
            newUserComments[id]['toAdd'] = ''
            this.setState({userComments: newUserComments});
        }
    }

    render() {
        if (localStorage.getItem('access-token') !== null) {
        
        const { classes } = this.props;

        return (
            <div>
                <Header
                    myAccountHandler={this.goToProfile}
                    profilePictureUrl={this.state.userInfo.profile_picture}
                    baseUrl={this.props.baseUrl}
                    showSearchBox='true'
                    showProfilePicture='true'
                    showMyAccountMenu='true'
                    logoutHandler={this.logoutHandler}
                    searchHandler={this.searchHandler}
                />
                <div id='cards-grid-list'>
                    <GridList cols={2} cellHeight='auto' className={classes.cardsGrid}>
                        {this.state.filteredUserPosts.map((filteredPost,index) => (
                            <GridListTile key={index} >
                                <GridListCard  
                                    filteredPost={filteredPost} 
                                    timeReshape={this.timeReshape}
                                    likeHandler={this.likeHandler}
                                    likeState={this.state.likesState[filteredPost.id]}
                                    userComments={this.state.userComments[filteredPost.id]['added']}
                                    userComment={this.state.userComments[filteredPost.id]['toAdd']}
                                    commentInputChange={this.commentInputChange}
                                    addComment={this.addComment}
                                    />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
        )}
        else{
            return <Redirect to="/" />
        }
       
    }
}

const styles = theme => ({
    cardsGrid: {
        width: '80%',
    },
    
});
export default withStyles(styles)(Home);
