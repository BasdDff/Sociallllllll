import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from "redux";
import CommunityId from "./CommunityId";
import {getCommunityByIdThunkCreator} from "../../../redux/community/communityReducer";

class CommunityIdContainer extends React.Component {

    render() {
        return (
            <CommunityId
                adminId={this.props.community.userId}
                title={this.props.community.title}
                imageTitle={this.props.community.imageTitle}
                description={this.props.community.description}
                posts={this.props.community.posts}
                users={this.props.community.users}
            />
        )
    }

    componentDidMount() {
        let communityId = this.props.match.params.communityId
        this.props.setCommunityById(communityId)
    }
}


let mapStateToProps = (state) => {
    return {
        isAuth: state.loginPage.isAuth,
        community: state.communityPage.community,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCommunityById: (communityId) => {
            dispatch(getCommunityByIdThunkCreator(communityId))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(CommunityIdContainer)
