import Log from "../components/Log/login";
import Nav from "../components/Navigation";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="accueil">
        <div className="log-container">
          <Log />
        </div>
      </div>
    </div>
  )
};

export default Home;