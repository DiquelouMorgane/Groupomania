import axios from "axios";
import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm";
import CommentsCard from "./CommentsCard";
import {REACT_APP_API_URL} from "../../utils/config"

//Daysjs part//
import dayjs from "dayjs"
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

const PostsCard = props => {
    const {post} = props
  
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)
    const [dataComment, setDataComment] = useState([])
    const [showComments, setShowComments] = useState(false)
  
    const comments = post.comments
    useEffect(() => {
      setDataComment(comments)
    }, [comments])
  
    //Retrieve user infos in localstorage//
    let newUser = JSON.parse(localStorage.getItem("newUser"))
    let users_id = newUser.id
    let users_admin = newUser.admin
  
    //Delete icon//
    useEffect(() => {
      if (post.users_id === users_id || users_admin !== null) {
        setShowDeleteIcon(true)
      }
    }, [users_id, post.users_id, users_admin])
  
    //Delete function//
    const handleDelete = () => {
      axios({
        method: "DELETE",
        url: `${REACT_APP_API_URL}/posts`,
        headers: {
          "authorization": localStorage.getItem("Token"),
        },
        data: {
          id: post.id,
          users_id: users_id,
          admin: users_admin,
          post_user_id: post.users_id,
        },
      })
        .then(res => {
          props.addPost(res.data.post)
        })
        .catch(err => {
          console.log(err)
        })
    }
    const addNewComment = newComment => {
      setDataComment(dataComment.concat(newComment))
    }
    const deleteComment = commentToDelete => {
      let updateComment = dataComment.filter(i => i.id !== commentToDelete.id)
      setDataComment(updateComment)
    }
    return (
      <li className="card">
        <div className="data">
          <div className="data-header">
            <h3>
              Votre collègue {post.users.firstName} {post.users.lastName} a publié{" "}
              {dayjs(post.createdAt).locale("fr").fromNow()}
            </h3>
            {showDeleteIcon && (
              <button
                className="comment-card-crud delete-button"
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer ce post ?")) {
                    handleDelete()
                  }
                }}
              >
                <img
                  src={"../images/icons/delete.png"}
                  alt="delete-comment"
                  className="delete-img"
                />
              </button>
            )}
          </div>
          <div className="data-container">
            <p className="textcontent">{post.text_content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="post-imageurl"
                className="post-image"
              />
            )}
          </div>
          <div className="data-footer">
            <div className="comment-icone">
              <img
                onClick={() => setShowComments(!showComments)}
                src="../images/icons/chat.png"
                alt="chat"
                className="button"
              />
              <CommentForm postId={post.id} newComment={addNewComment} />
            </div>
          </div>
          <div className="comments">
            <ul className="comments-list">
              {showComments &&
                dataComment.map((comments, i) => (
                  <CommentsCard
                    className="comments-card"
                    comments={comments}
                    key={i}
                    commentToDelete={deleteComment}
                  />
                ))}
            </ul>
          </div>
        </div>
      </li>
    )
  };
  
  export default PostsCard;