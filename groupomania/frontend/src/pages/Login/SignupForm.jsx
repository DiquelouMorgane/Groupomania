import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import {useState} from "react"

const SignUpForm = () => {
  // useState
  const [errorData, setErrorData] = useState("")

  // register
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  // navigate
  const navigate = useNavigate()

  // axios
  const onSubmit = data => {
    axios({
      method: "POST",
      url: `http://localhost:5000/api/auth/signup`,
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      },
    })
      .then(res => {
        let token = res.data.token
        let newUser = JSON.stringify(res.data)
        localStorage.setItem("Token", token)
        localStorage.setItem("newUser", newUser)
        navigate("/posts")
      })
      .catch(error => {
        console.log(error)
        setErrorData(
          "Utilisateur déjà existant, veuillez vous connecter !"
        )
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="accueil-form">
        {/* firstname */}
        <label htmlFor="firstname">Prénom</label>
        <br />
        <input
          {...register("firstname", {
            required: true,
            minLength: {
              value: 2,
              message: "Vous devez entrer au moins 2 caractères",
            },
            maxLength: {
              value: 15,
              message: "Vous devez entrer au maximum 15 caractères",
            },
          })}
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
        <br />
        {/* lastname */}
        <label htmlFor="lastname">Nom</label>
        <br />
        <input
          type="text"
          {...register("lastname", {
            required: true,
            minLength: {
              value: 2,
              message: "Vous devez entrer au moins 2 caractères",
            },
            maxLength: {
              value: 15,
              message: "Vous devez entrer au maximum 15 caractères",
            },
          })}
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
        <br />
        {/* email */}
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          {...register("email", {
            required: true,
            message: "Vous devez entrer une adresse mail valide",
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        {/* password */}
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value: /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64})$/,
              message:
                "Votre mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        <input type="submit" value="Je m'inscris" className="button" />
        <span className="error-message">{errorData}</span>{" "}
      </form>
    </div>
  )
}

export default SignUpForm;