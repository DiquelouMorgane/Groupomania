import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import {useState} from "react"
import {REACT_APP_API_URL} from "../../utils/config"

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
      url: `${REACT_APP_API_URL}/auth/signup`,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    })
      .then(res => {
        let token = res.data.token
        let newUser = JSON.stringify(res.data)
        localStorage.setItem("Token", token)
        localStorage.setItem("newUser", newUser)
        navigate("/post")
      })
      .catch(error => {
        setErrorData(
          "Utilisateur déjà existant, veuillez vous connecter !"
        )
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="accueil-form">
        {/* firstName */}
        <label htmlFor="firstName">Prénom</label>
        <br />
        <input
          {...register("firstName", {
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
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <br />
        {/* lastName */}
        <label htmlFor="lastName">Nom</label>
        <br />
        <input
          type="text"
          {...register("lastName", {
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
        {errors.lastName && <span>{errors.lastName.message}</span>}
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
};

export default SignUpForm;