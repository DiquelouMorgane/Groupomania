import axios from "axios"
import {useForm} from "react-hook-form"
import DeleteProfil from "./deleteProfil"

const Profil = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const firstnameUser = userInfo.firstname
  const lastnameUser = userInfo.lastname
  const id = userInfo.id
  const email = userInfo.email

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onSubmit = data => {
    console.log(data)
    let firstname = data.firstname
    let lastname = data.lastname
    let email = data.email

    axios({
      method: "PUT",
      url: "http://localhost:5000/api/users",
      headers: {
        "x-access-token": localStorage.getItem("Token"),
      },
      params: {userId: id},
      data: {
        id,
        firstname,
        lastname,
        email,
      },
    })
      .then(res => {
        let userInfo = JSON.stringify(res.data.user)
        localStorage.setItem("userInfo", userInfo)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="user">
      <div className="user-welcome">
        <h1>Bienvenue {firstnameUser}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="data-form">
          <label htmlFor="prenom" className="user-form-label">
            Prénom
          </label>
          <br />
          <input
            type="text"
            className="user-form-input"
            placeholder={firstnameUser}
            {...register("firstname", {
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
          {errors.firstname && <span>{errors.firstname.message}</span>}
          <br />

          <label htmlFor="lastname" className="user-form-label">
            Nom
          </label>
          <br />
          <input
            type="text"
            className="user-form-input"
            placeholder={lastnameUser}
            {...register("lastname", {
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
          {errors.lastname && <span>{errors.lastname.message}</span>}
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

export default Profil;