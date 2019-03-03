import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {CardContent, CardMedia, Divider,
    Typography, IconButton, Input, InputLabel, 
    Button, Grid, List, ListItem
        } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const Content = (props) => {
  const { classes } = props;

  return (
    	<CardContent>
            <CardMedia
                className={classes.cardMediaStyles}
                image={props.filteredPost.images.standard_resolution.url}
                title={props.filteredPost.caption!==null?props.filteredPost.caption.text:null}
            />
            <Divider className={classes.divider} />
            <Typography className={classes.caption} variant='subtitle1'>
                {props.filteredPost.caption!==null?props.filteredPost.caption.text:null}
            </Typography>
            <Typography className={classes.tagsStyle} variant='subtitle2'>
                {props.filteredPost.tags.map(function (t) { return `#${t} ` })}
            </Typography>
            <Grid container={true} direction='row' alignItems='center'>
                <Grid item={true} className={classes.favoriteIconGridItem}>
                    <IconButton onClick={() => props.likeHandler(props.filteredPost.id)}>
                        {props.likeState ?
                            <FavoriteIcon nativeColor='red' fontSize='large' /> :
                            <FavoriteBorderIcon nativeColor='black' fontSize='large' />
                        }
                    </IconButton>
                </Grid>
                <Grid item={true}>
                    <Typography className={classes.likesCount} variant='body2'>
                        {props.filteredPost.likes.count} likes
                    </Typography>
                </Grid>
            </Grid>

            <List style={{marginTop: '-5%'}}>
                {props.userComments.map((userComment, index) => (
                    <ListItem key={props.filteredPost.id + 'comment' + index} style={{marginBottom: '-5%'}}>
                        <Typography variant='body1' style={{fontWeight: 'bold'}}>{props.filteredPost.user.username}:</Typography>
                        <Typography variant='subtitle1' style={{marginLeft: 5}}>{userComment}</Typography>
                    </ListItem>
                ))}
            </List>
            <div id='comment-div'>
                <FormControl className={classes.commentFormStyle}>
                    <InputLabel
                        classes={{
                            root: classes.commentLabel,
                            focused: classes.commentFocused,
                        }}
                    >
                      Comment
                    </InputLabel>
                    <Input
                        classes={{
                            underline: classes.commentInputUnderline,
                        }}
                        value = {props.userComment}
                        onChange={(event) => props.commentInputChange(event.target.value, props.filteredPost.id)}
                    />
                </FormControl>
                <Button
                    className={classes.commentButton}
                    variant='contained'
                    color='primary'
                    onClick={() => props.addComment(props.filteredPost.id)}
                >
                    ADD
                </Button>
            </div>

        </CardContent>
  )
}

const styles = theme => ({
    
    
    cardMediaStyles: {
        // TODO - aspect ratio
        height: 0,
        paddingTop: '56%',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#c0c0c0'
    },
    captionStyle: {
        fontWeight: 'bold',
    },
    tagsStyle: {
        // fontWeight: 'bold',
        color: '#82C0FF',
    },
    favoriteIconGridItem: {
        marginTop: 5,
    },
    likesCount: {
        marginTop: '10%',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    commentFormStyle: {
        width: '80%',
    },
    commentLabel: {
        '&$commentFocused': {
            color: indigo[500],
        },
    },
    commentFocused: {},
    commentInputUnderline: {
        '&:after': {
            borderBottomColor: indigo[500],
        },
    },
    commentButton: {
        marginTop: 15,
        marginLeft: 10,
    },
});
export default withStyles(styles)(Content);
