import React from 'react';
import { Card, CardHeader, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Content from './Content';

const GridListCard = (props) => {
	const { classes, timeReshape, likeHandler } = props;
  	return (
	    <Card className={classes.cardStyle}>
            <CardHeader
                classes={{
                    title: classes.HeaderTitle,
                    subheader: classes.HeaderSubheader,
                }}
                avatar={
                    <Avatar alt='Profile' src={props.filteredPost.user.profile_picture} />
                }
                title={props.filteredPost.user.username}

                subheader={timeReshape(props.filteredPost.created_time)}
            />
            <Content 
            	filteredPost={props.filteredPost} 
            	likeHandler={likeHandler} 
            	likeState={props.likeState}
            	userComments={props.userComments}
            	userComment={props.userComment}
            	commentInputChange={props.commentInputChange}
                addComment={props.addComment}
            />
        </Card>
  )
}

const styles = theme => ({
    
    cardStyle: {
        maxWidth: 500,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    HeaderTitle: {
        fontWeight: 'bold',
    },
    HeaderSubheader: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    
});
export default withStyles(styles)(GridListCard);

