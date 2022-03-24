import React from "react";
import '../Post/_post.scss';
import Avatar from '@material-ui/core/Avatar';

function Post({ userId, content, imageUrl }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                className="post__avatar"
                alt="avatar picture"
                src="./images/avatar.jpg"
                />
                <h3>{userId}</h3>
            </div>
            <img
            className="post__picture"
            src={imageUrl}
            alt=""
            />
            <h4 className="post__text"><strong>{userId}</strong>{content}</h4>
        </div>
    )
}

export default Post;