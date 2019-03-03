import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import indigo from '@material-ui/core/colors/indigo';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {
    Card, CardHeader, Avatar, CardContent, CardMedia, Divider,
    Typography, IconButton, Input, InputLabel, 
    Button, Grid, GridList, GridListTile, List, ListItem
        } from '@material-ui/core';

const GridListCards = (props) => {
  return (
	    <Card className={classes.cardStyle}>
            <CardHeader
                classes={{
                    title: classes.HeaderTitle,
                    subheader: classes.HeaderSubheader,
                }}
                avatar={
                    <Avatar alt='Profile' src={filteredPost.user.profile_picture} />
                }
                title={filteredPost.user.username}

                subheader={this.timeReshape(filteredPost.created_time)}
            />
            <CardContent>
                <CardMedia
                    className={classes.cardMediaStyles}
                    image={filteredPost.images.standard_resolution.url}
                    title={filteredPost.caption!==null?filteredPost.caption.text:null}
                />
                <Divider className={classes.divider} />
                <Typography className={classes.caption} variant='subtitle1'>
                    {filteredPost.caption!==null?filteredPost.caption.text:null}
                </Typography>
                <Typography className={classes.tagsStyle} variant='subtitle2'>
                    {filteredPost.tags.map(function (t) { return `#${t} ` })}
                </Typography>
                <Grid container={true} direction='row' alignItems='center'>
                    <Grid item={true} className={classes.favoriteIconGridItem}>
                        <IconButton onClick={() => this.likeHandler(filteredPost.id)}>
                            {this.state.likesState[filteredPost.id] ?
                                <FavoriteIcon nativeColor='red' fontSize='large' /> :
                                <FavoriteBorderIcon nativeColor='black' fontSize='large' />
                            }
                        </IconButton>
                    </Grid>
                    <Grid item={true}>
                        <Typography className={classes.likesCount} variant='body2'>
                            {filteredPost.likes.count} likes
                        </Typography>
                    </Grid>
                </Grid>

                <List style={{marginTop: '-5%'}}>
                    {this.state.userComments[filteredPost.id]['added'].map((userComment, index) => (
                        <ListItem key={filteredPost.id + 'comment' + index} style={{marginBottom: '-5%'}}>
                            <Typography variant='body1' style={{fontWeight: 'bold'}}>{filteredPost.user.username}:</Typography>
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
                            value = {this.state.userComments[filteredPost.id]['toAdd']}
                            onChange={(event) => this.commentInputChange(event.target.value, filteredPost.id)}
                        />
                    </FormControl>
                    <Button
                        className={classes.commentButton}
                        variant='contained'
                        color='primary'
                        onClick={() => this.addComment(filteredPost.id)}
                    >
                        ADD
                    </Button>
                </div>

            </CardContent>
        </Card>
  )
}

export default GridListCards;