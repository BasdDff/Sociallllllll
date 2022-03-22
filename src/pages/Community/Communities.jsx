import React, {useEffect} from 'react'
import styles from './Communities.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    getCommunitiesChangedThunkCreator,
    getCommunitiesThunkCreator
} from "../../redux/community/communityReducer";
import Community from "./Community";
import {MyPaginator} from "../../utils/Paginators/MyPaginator";
import BaseWrapper from "../../components/UI/BaseWrapper/BaseWrapper";

const Communities = () => {

    const dispatch = useDispatch()

    const {communities, pageSize, totalCount, currentPage} = useSelector(state => state.communityPage)

    useEffect(() => {
        dispatch(getCommunitiesThunkCreator(currentPage, pageSize))
    }, [])

    const onPageChanged = (pageNumber) => {
        dispatch(getCommunitiesChangedThunkCreator(pageNumber, pageSize))
    }

    return (
        <BaseWrapper>
            <div>
                {communities.map((community) => {
                    return <Community key={community._id}
                                      id={community._id}
                                      imageTitle={community.imageTitle}
                                      title={community.title} description={community.description}
                    />
                })}
                <MyPaginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totaItemsCount={totalCount}
                    pageSize={pageSize}
                    classSpan={styles.span}
                    activeClassSpan={styles.selectedPage}
                />
            </div>
        </BaseWrapper>
    )
}

export default Communities