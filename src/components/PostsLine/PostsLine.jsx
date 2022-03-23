import React from 'react'
import Post from "../Post/Post";

const PostsLine = ({posts, tag, profilePicture}) => {
    return (
        <>
            {posts.map((post) => (
                <Post key={post._id}
                                userId={post.userId}
                                _id={post._id}
                                description={post.description}
                                image={post.image}
                                likes={post.likes}
                />
            ))}
        </>
    )
}

export default PostsLine