import axios from "axios"
import {useForm} from "react-hook-form"
import DeleteProfil from "./deleteProfil"

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"

const UpdateProfil = () => {
  const newUser = JSON.parse(localStorage.getItem("newUser"))
  const firstNameUser = newUser.firstName
  const lastNameUser = newUser.lastName
  const id = newUser.id
  const email = newUser.email

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onSubmit = data => {
    let firstName = data.firstName
    let lastName = data.lastName
    let email = data.email

    axios({
      method: "PUT",
      url: "http://localhost:5000/api/users",
      headers: {
        "authorization": localStorage.getItem("Token"),
      },
      data: {
        id,
        firstName,
        lastName,
        email,
      },
    })
      .then(res => {
        let newUser = JSON.stringify(res.data.user)
        localStorage.setItem("newUser", newUser)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="user">
      <div className="user-welcome">
        <h1>Bienvenue {firstNameUser}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="data-form">
          <label htmlFor="firstName" className="user-form-label">
            Prénom
          </label>
          <br />
          <input
            type="text"
            className="user-form-input"
            placeholder={firstNameUser}
            {...register("firstName", {
              minLength: {
                value: 2,
                message: "Le prénom entré est trop court !",
              },
              maxLength: {
                value: 40,
                message: "Le prénom entré est trop long !",
              },
            })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
          <br />

          <label htmlFor="lastName" className="user-form-label">
            Nom
          </label>
          <br />
          <input
            type="text"
            className="user-form-input"
            placeholder={lastNameUser}
            {...register("lastName", {
              minLength: {
                value: 2,
                message: "Le nom entré est trop court !",
              },
              maxLength: {
                value: 40,
                message: "Le nom entré est trop long !",
              },
            })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
          <br />
          <label htmlFor="email" className="user-form-label">
            Email
          </label>
          <br />
          <input
            className="user-form-input"
            placeholder={email}
            type="email"
            {...register("email", {
              message: "L'email entré n'est pas valide !",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />

          <input
            className="post-button button"
            type="submit"
            value="Modifier mon profil"
          />
        </div>
      </form>
      <DeleteProfil />
    </div>
  )
}

export default UpdateProfil;