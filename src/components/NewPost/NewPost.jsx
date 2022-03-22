import React from 'react'
import styles from './NewPost.module.scss'
import {useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PostService from "../../services/PostService";
import CheckAuth from "../../utils/CheckAuth/CheckAuth";
import {useDispatch, useSelector} from "react-redux";
import {
    DivBackgroundSecondary,
    DivBorderBottom,
    ButtonBorderBackgroundHover,
    LabelBorderBackgroundHover
} from "../UI/ThemesTags/Components";
import ProfileAvatarDefault from "../UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import {addPostActionCreator} from "../../redux/post/postReducer";

const NewPost = () => {

    const dispatch = useDispatch()

    const profile = useSelector(state => state.user.profile)

    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null);

    const submitHandler = async (event) => {
        event.preventDefault()
        const newPost = {
            userId: profile._id,
            description: description,
        }
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.image = `http://localhost:5000/images/${fileName}`
            try {
                await PostService.addFileToNewPost(data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await PostService.addNewPost(newPost)
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(addPostActionCreator(response.data))
                        setDescription("")
                    }
                })
            //window.location.reload();
        } catch (error) {
            console.log(error)
        }
        console.log(newPost)
    }

    return (
        <CheckAuth _id={profile._id}>
            <DivBackgroundSecondary classN={styles.newPost}>
                <div className={styles.newPost__wrapper}>
                    <DivBorderBottom classN={styles.newPost__top}>
                        <ProfileAvatarDefault avatar={profile.profilePicture} classN={styles.newPost__postAvatar}/>
                        <input className={styles.newPost__inputText}
                               placeholder={`What's in your mind ${profile.username} ?`}
                               value={description}
                               onChange={(event) => {
                                   setDescription(event.target.value)
                               }}/>
                    </DivBorderBottom>
                    {file && (
                        <div className={styles.newPost__fileWrapper}>
                            <img className={styles.newPost__fileImg} src={URL.createObjectURL(file)} alt={``}/>
                            <CancelIcon className={styles.newPost__fileIcon} onClick={() => setFile(null)}/>
                        </div>
                    )}
                    <form className={styles.newPost__bottom} onSubmit={submitHandler}>
                        <div className={styles.newPost__options}>
                            <LabelBorderBackgroundHover htmlFor={`file`} classN={styles.newPost__option}>
                                <PermMediaIcon htmlColor={`tomato`} className={styles.newPost__optionIcon}/>
                                <span className={styles.newPost__optionText}> Photo or Video </span>
                                <input style={{display: "none"}} type={`file`} id={`file`} accept={`.png,.jpeg,.jpg`}
                                       onChange={(e) => setFile(e.target.files[0])}/>
                            </LabelBorderBackgroundHover>
                        </div>
                        <ButtonBorderBackgroundHover className={styles.newPost__shareButton}>
                            Share
                        </ButtonBorderBackgroundHover>
                    </form>
                </div>
            </DivBackgroundSecondary>
        </CheckAuth>
    )
}

export default NewPost