//dto - data transfer object

module.exports = class UserDto {
    
    email
    _id
    isActivated 

    username
    tag
    profilePicture
    backgroundPicture
    country
    city
    biography
    birthday
    joinedDay
    gender

    followers
    followings
    links

    role

    constructor(model) {
        this.email = model.email
        this._id = model._id
        this.isActivated = model.isActivated

        this.username = model.username
        this.tag = model.tag
        this.profilePicture = model.profilePicture
        this.backgroundPicture = model.backgroundPicture
        this.country = model.country
        this.city = model.city
        this.biography = model.biography
        this.birthday = model.birthday
        this.joinedDay = model.joinedDay
        this.gender = model.gender

        this.followers = model.followers
        this.followings = model.followings
        this.links = model.links

        this.role = model.role
    }
    
} 