import SecuredConnexion from "../components/Log/SecuredConnexion";
import Nav from "../components/Navigation";
import UpdateProfil from "../components/Profil/profil";

const Profil = () => {
  return (
    <div>
      <Nav />
      <SecuredConnexion>
        <div className="profil">
          <div className="profil-container">
            <UpdateProfil />
          </div>
        </div>
      </SecuredConnexion>
    </div>
  )
};

export default Profil;