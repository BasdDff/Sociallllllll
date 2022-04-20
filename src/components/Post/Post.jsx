import React, {useEffect, useState} from 'react'
import styles from './Post.module.scss'
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import ProfileAvatarDefault from "../UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import CheckAuth from "../../utils/CheckAuth/CheckAuth";
import EditPost from "../EditPost/EditPost";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModalWindow from "../UI/ModalWindow/ModalWindow";
import {NavLink} from 'react-router-dom'
import {BackgroundSecondary} from "../UI/ThemeTags/Components";
import UserService from "../../services/UserService";
import {useDispatch, useSelector} from "react-redux";
import {deletePostThunkCreator, editUserPostThunkCreator, likePostThunkCreator} from "../../redux/actions/post";

const Post = ({
                  userId,
                  _id,
                  description,
                  image,
                  likes,
              }) => {

    const [editMode, setEditMode] = useState(false)
    const setEditModeClick = () => {
        setEditMode(true)
    }

    const [moreOptions, setMoreOptions] = useState(false)
    const setMoreOptionsClick = () => {
        setMoreOptions(!moreOptions)
    }

    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await UserService.fetchUsers(userId)
            setUser(res.data);
        };
        fetchUser();
    }, [userId]);

    const dispatch = useDispatch()

    const authorizedUserId = useSelector(state => state.loginPage.authorizedUserId)

    const likePost = () => {
        dispatch(likePostThunkCreator(_id, authorizedUserId))
    }

    const deletePost = () => {
        dispatch(deletePostThunkCreator(_id))
    }

    const editPost = (idPost, desc, file) => {
        dispatch(editUserPostThunkCreator(idPost, desc, file))
    }

    return (
        <>
            {editMode ?
                <EditPost profilePicture={user.profilePicture} description={description} image={image} _id={_id}
                          username={user.username} tag={user.tag}
                          setEditMode={setEditMode} editPost={editPost}/>
                :
                <BackgroundSecondary className={styles.post}>
                    <div className={styles.post__wrapper}>
                        <ProfileAvatarDefault avatar={user.profilePicture} classN={styles.post__postAvatar}/>
                        <div className={styles.post__userData}>
                            <div className={styles.post__wrapperDots}>
                                <NavLink to={`/profile/${userId}`}
                                         className={styles.post__username}> {user.username} </NavLink>
                                <CheckAuth _id={userId}>
                                    <div className={styles.post__iconsWrapper}>
                                        <IconButton onClick={setMoreOptionsClick}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                        <div
                                            className={moreOptions ? `${styles.post__itemsControl} ${styles.active}` : `${styles.post__itemsControl}`}>
                                            <div className={styles.post__itemControl} onClick={setEditModeClick}>
                                                <div className={styles.post__itemControlText}>
                                                    Edit post
                                                </div>
                                                <EditIcon
                                                    className={`${styles.post__icon} ${styles.post__optionsIcon}`}/>
                                            </div>
                                            <div className={styles.post__itemControlModal}>
                                                <ModalWindow name={"Delete post"}
                                                             active={modalActive} setActive={setModalActive}
                                                             classN={styles.post__modalText}
                                                             widthContentMediaOne={"60vw"}
                                                             heightContentMediaOne={"60vh"}
                                                >
                                                    <div>
                                                        <div className={styles.post__deleteText}>
                                                            Delete post ?
                                                        </div>
                                                        <button onClick={deletePost}
                                                                className={styles.post__deleteBtn}> Delete
                                                        </button>
                                                    </div>
                                                </ModalWindow>
                                                <HighlightOffIcon
                                                    className={`${styles.post__icon} ${styles.post__optionsIcon}`}/>
                                            </div>
                                        </div>
                                    </div>
                                </CheckAuth>
                            </div>
                            <div className={styles.post__tag}> @{user.tag} </div>
                            <div className={styles.post__editIconFlex}>
                                <div className={styles.post__description}> {description} </div>
                            </div>
                        </div>
                    </div>
                    {image ?
                        <ModalWindow name={<div className={styles.post__imgContainer}>
                            <img src={image} alt={`postImage`} className={styles.post__img}/>
                        </div>} active={modalActive2} setActive={setModalActive2}
                                     classN={styles.post__modalText}>
                            <img src={image} alt={`postImage`} className={styles.post__imgModal}/>
                        </ModalWindow>
                        : ""
                    }
                    <div className={styles.post__icons}>
                        <InsertCommentIcon className={styles.post__icon}/>
                        <div className={styles.post__likesWrapper}>
                            <div className={styles.post__likesQuantity}>
                                {likes.length > 0 ? likes.length : ""}
                            </div>
                            <FavoriteIcon className={`${styles.post__icon} ${styles.post__likeIcon}`}
                                          onClick={likePost}/>
                        </div>
                        <ShareIcon className={styles.post__icon}/>
                    </div>
                </BackgroundSecondary>
            }
        </>
    )
}

export default Post