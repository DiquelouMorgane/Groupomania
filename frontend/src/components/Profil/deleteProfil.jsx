import axios from "axios"

const DeleteProfil = () => {
  const handleDelete = () => {
    let newUser = JSON.parse(localStorage.getItem("newUser"))
    let userId = newUser.id
    axios({
      method: "DELETE",
      url: "http://localhost:5000/api/users",
      headers: {
        "authorization": localStorage.getItem("Token"),
      },
      params: {userId},
      data: {
        id: userId,
      },
    })
      .then(res => {
        localStorage.clear()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <button
      className="delete-user"
      onClick={() => {
        if (
          window.confirm(
            "Voulez-vous vraiment supprimer votre profil ? Attention, toutes les données liées à ce compte seront également supprimées définitivement."
          )
        ) {
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
  )
}

export default DeleteProfil;