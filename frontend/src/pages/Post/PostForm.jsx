import axios from "axios"
import {useState} from "react"
import {useForm} from "react-hook-form"
import Header from "../../components/header"

const PostForm = props => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const [imageUrl, setimageUrl] = useState(null)
  const [file, setFile] = useState(false)
  const [emptyMessage, setEmptyMesssage] = useState(null)

  //Retrieve the picture infos//
  const handlePicture = e => {
    setimageUrl(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const onSubmit = async content => {
    // Text or picture to post//
    if (content.text_content || file) {
      //Empty message//
      setEmptyMesssage(false)
      const userId = JSON.parse(localStorage.getItem("newUser")).id
      let data
      //Requests with a picture//
      if (file) {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
        data = new FormData()
        data.append("user_id", userId)
        data.append("text_content", content.text_content)
        data.append("image", file)
      } else {
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded"
        data = {user_id: userId, text_content: content.text_content}
      }
      // POST
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/posts",
        headers: {
          "authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
        params: {userId: userId},
        data,
      })
        .then(res => {
          console.log(res.data.post)
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
    <div className="main post">
      <Header />
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
            <label for="imageUrl">
              <img
                src={"/images/video.png"}
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
    </div>
  )
}

export default PostForm;