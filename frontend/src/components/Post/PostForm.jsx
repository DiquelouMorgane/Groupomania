import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";


const PostForm = props => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState(false)
  const [emptyMessage, setEmptyMesssage] = useState(null)

  //Retrieve the picture infos//
  const handlePicture = e => {
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const onSubmit = async content => {
    // Text or picture to post//
    if (content.text_content || file) {
      //Empty message//
      setEmptyMesssage(false)
      const user_id = JSON.parse(localStorage.getItem("newUser")).id
      let data
      //Requests with a picture//
      if (file) {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
        data = new FormData()
        data.append("user_id", user_id)
        data.append("text_content", content.text_content)
        data.append("file", file)
      } else {
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded"
        data = {user_id: user_id, text_content: content.text_content}
      }
      // POST
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/posts",
        headers: {
          "authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
        data,
      })
        .then(res => {
          props.addPost(res.data.post)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setEmptyMesssage(true)
    }
  }
  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="post-form">
          <div className="column1">
            <label htmlFor="text_content" className="text_content_label">
              Qu'allez-vous partager avec vos collègues aujourd'hui ?
            </label>
            <br />
            <textarea
              row={2}
              type="textarea"
              className="text_content_input"
              {...register("text_content", {
                minLength: {
                  value: 10,
                  message:
                  "Vous devez créer un post de 10 caractères au minimum !",
                },
                maxLength: {
                  value: 10000,
                  message: "Attention, votre post est trop long !",
                },
              })}
            />
            {errors.text_content && <span>{errors.text_content.message}</span>}
          </div>
          <div className="column2">
            <label htmlFor="imageUrl">
              <img
                src={"../images/icons/picture.png"}
                alt="logo"
                className="add_media, button"
              />
            </label>
            <input
              type="file"
              id="imageUrl"
              name="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={e => handlePicture(e)}
            />
            <input className="post-button button" type="submit" value="Poster" />
          </div>

          <div className="preview-container">
            <p>
              {emptyMessage && "Veuillez publiez un message et/ou une image !"}
            </p>
            <img src={imageUrl} alt="" />
          </div>
        </form>
      </div>
  )
};

export default PostForm;