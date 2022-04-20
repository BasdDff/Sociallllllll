import React, {useState} from 'react'
import styles from './ProfileInfo.module.scss'
import BackgroundUserDefault from "../UI/DefaultImages/BackgroundUserDefault/BackgroundUserDefault";
import AvatarUserDefault from "../UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import CheckAuth from "../../utils/CheckAuth/CheckAuth";
import {Border, BorderBackgroundHover} from "../UI/ThemeTags/Components";
import ModalWindow from "../UI/ModalWindow/ModalWindow";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CakeIcon from "@material-ui/icons/Cake";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useDispatch} from "react-redux";
import {logoutThunkCreator} from "../../redux/actions/login";

const ProfileInfo = ({profile}) => {

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutThunkCreator())
    }

    const [modalActive, setModalActive] = useState(false)


    let linkElement = () => {
        if (profile.links) {
            return profile.links.map((link) => {
                return <div>
                    <div> {link.title} </div>
                    <a href={link.url} target={`_blank`}> {link.url} </a>
                </div>
            })
        } else {
            return ""
        }
    }

    return (
        <>
            <BackgroundUserDefault photo={profile.backgroundPicture}
                                   classN={styles.profile__background}/>
            <div className={styles.profile}>
                <div className={styles.profileInfo}>
                    <div className={styles.profileInfo__pic}>
                        <div className={styles.profileInfo__picAndEditFlex}>
                            <AvatarUserDefault avatar={profile.profilePicture}
                                               classN={styles.profileInfo__profilePicture}/>
                            <CheckAuth _id={profile._id}>
                                <div className={styles.profileInfo__editWrapper}>
                                    <BorderBackgroundHover className={styles.profileInfo__edit} onClick={() => {
                                        setModalActive(!modalActive)
                                    }}>
                                        <ModalWindow name={"Edit Profile"} active={modalActive}
                                                     setActive={setModalActive} widthContentMediaOne={"100vw"}
                                                     heightContentMediaOne={"100vh"}>
                                            <ProfileEdit/>
                                        </ModalWindow>
                                    </BorderBackgroundHover>
                                </div>
                            </CheckAuth>
                        </div>
                        <div className={styles.profileInfo__exitFlex}>
                            <div className={styles.profileInfo__username}> {profile.username} </div>
                            <CheckAuth _id={profile._id}>
                                <BorderBackgroundHover className={styles.profileInfo__exit} onClick={logout}>
                                    <ExitToAppIcon/>
                                    <button className={styles.profileInfo__buttonExit}> Logout</button>
                                </BorderBackgroundHover>
                            </CheckAuth>
                        </div>
                        <div className={styles.profileInfo__tag}> @{profile.tag} </div>
                        <div className={styles.profileInfo__biography}> {profile.biography} </div>
                        <div className={styles.profileInfo__birthdayFlex}>
                            <div className={styles.profileInfo__address}>
                                <HomeIcon className={styles.profileInfo__addressIcon}/>
                                <div className={styles.profileInfo__country}> {profile.country} </div>
                                <div className={styles.profileInfo__city}> {profile.city} </div>
                            </div>
                            <div className={styles.profileInfo__birthday}>
                                <CakeIcon className={styles.profileInfo__birthdayIcon}/>
                                {new Date(profile.birthday).toLocaleString("ru", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    timezone: "UTC"
                                })}
                            </div>
                        </div>
                        <div className={styles.profileInfo__genderFlex}>
                            <div className={styles.profileInfo__joinedDay}>
                                <DateRangeIcon className={styles.profileInfo__joinedDayIcon}/>
                                Joined {new Date(profile.joinedDay).toLocaleString("ru", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                timezone: "UTC"
                            })}
                            </div>
                            <div className={styles.profileInfo__gender}>
                                male
                            </div>
                        </div>
                    </div>
                    <Border className={styles.profileInfo__links}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                            >
                                <Typography>
                                    Links
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <linkElement/>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Border>
                    <div className={styles.content}>
                        <BorderBackgroundHover className={styles.content__contentPart}>
                            Posts
                        </BorderBackgroundHover>
                        <BorderBackgroundHover className={styles.content__contentPart}>
                            Media
                        </BorderBackgroundHover>
                        <BorderBackgroundHover className={styles.content__contentPart}>
                            Replies
                        </BorderBackgroundHover>
                        <BorderBackgroundHover className={styles.content__contentPart}>
                            Likes
                        </BorderBackgroundHover>
                        <BorderBackgroundHover className={styles.content__contentPart}>
                            About
                        </BorderBackgroundHover>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo