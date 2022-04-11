import axios from "axios";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

//DAYJS//
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

const CommentsCard = props => {
  let {comments} = props
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  let newUser = JSON.parse(localStorage.getItem("newUser"))
  let users_id = newUser.id
  let users_isAdmin = newUser.isAdmin

  useEffect(() => {
    if (comments.users_id === users_id || users_isAdmin === 1) {
      setShowDeleteIcon(true)
    }
  }, [users_id, comments.users_id, users_isAdmin])

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: "http://localhost:5000/api/comments",
      headers: {
        "authorization": localStorage.getItem("Token"),
      },
      params: {userId: users_id},
      data: {
        users_id,
        id: comments.id,
        isAdmin: users_isAdmin,
      },
    })
      .then(res => {
        props.commentToDelete(comments)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <li className="comments-card">
      <div className="comments-card-data">
        <div className="comments-card-data-header">
          {comments.users !== undefined && (
            <h3>
              Votre collègue {comments.users.firstName} {comments.users.lastName} a
              commenté {dayjs(comments.createdAt).locale("fr").fromNow()}
            </h3>
          )}
          {showDeleteIcon && (
            <button
              className="comment-card-crud"
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
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
        <div className="comments-card-data-container">
          <p className="comments-card-data-content">{comments.content}</p>
        </div>
      </div>
    </li>
  )
};

export default CommentsCard;