import React, {useState} from 'react'
import styles from './EditPost.module.scss'
import ProfileAvatarDefault from "../UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from "@material-ui/icons/Cancel";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {Border} from "../UI/ThemeTags/Components";

const EditPost = ({profilePicture, description, image, _id, username, tag, theme, setEditMode, editPost}) => {

    const [desc, setDesc] = useState(description)
    const [file, setFile] = useState(image);

    const cancelHandler = () => {
        setEditMode(false)
    }

    return (
        <div className={`${theme}BackgroundColor ${styles.post}`}>
            <div className={`${theme}BorderBottomProfile ${styles.post__wrapper}`}>
                <ProfileAvatarDefault avatar={profilePicture} classN={styles.post__postAvatar}/>
                <div className={styles.post__userData}>
                    <div className={styles.post__username}> {username} </div>
                    <div className={styles.post__tag}> {tag} </div>
                    <div className={styles.post__editIconFlex}>
                        <Border>
                            <input value={desc} className={styles.post__inputDesc} onChange={(event) => {
                                setDesc(event.target.value)
                            }}/>
                        </Border>
                        {file && (
                            <div className={styles.post__fileWrapper}>
                                <img className={styles.post__fileImg} src={file} alt={``}/>
                                <CancelIcon className={styles.post__fileIcon} onClick={() => setFile(null)}/>
                            </div>
                        )}
                        <div className={styles.post__iconWrapper} onClick={() => {
                            editPost(_id, desc, file)
                            setEditMode(false)
                        }}>
                            <div className={styles.post__iconText}>
                                Save
                            </div>
                            <SaveIcon/>
                        </div>
                        <div className={styles.post__iconWrapper} onClick={cancelHandler}>
                            <div className={styles.post__iconText}>
                                Cancel
                            </div>
                            <CancelPresentationIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPost