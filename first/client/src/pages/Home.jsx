
import Client from "../components/Client";
import Projects from "../components/Project";
import AddClientModal from "../components/addClientModel";
import AddProjectModal from "../components/addProject";
const Home = () => {
  return (
    <>
    <div className="flex"><AddClientModal/><AddProjectModal/></div>
    <Client/>
    <Projects/>
    </>
  )
}

export default Home
