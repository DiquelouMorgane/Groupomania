import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";

const CommentForm = props => {
const [message, setMessage] = useState()

useEffect(() => {
    setMessage("")
    setMessage()
  }, [message])

const user_id = JSON.parse(localStorage.getItem("newUser")).id

//Resgister//
const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm()

const onSubmit = data => {
    axios({
      method: "POST",
      url: "http://localhost:5000/api/comments",
      headers: {
        "authorization": localStorage.getItem("Token"),
      },
      data: {
        users_id: user_id,
        post_id: props.postId,
        content: data.content,
      },
    })
    .then(res => {
        props.newComment(res.data.comment)
        setMessage("")
    }).catch(err => {
        console.log(err)
    })
}
return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
        <textarea
          placeholder="Ecrivez un commentaire ici !"
          className="content_input"
          value={message}
          onChange={e => setMessage(e.target.value)}
          {...register("content", {
            minLength: {
              value: 10,
              message: "Votre commentaire doit être de 5 caractères au minimum !",
            },
            maxLength: {
              value: 350,
              message:
                "Attention, votre commentaire est trop long !",
            },
          })}
        />
        {errors.content && <span>{errors.content.message}</span>}
        <input
          className="comment-button button"
          type="image"
          src="../images/icons/send.png"
          alt="send"
        />
      </form>
    </div>
  )
};

export default CommentForm;