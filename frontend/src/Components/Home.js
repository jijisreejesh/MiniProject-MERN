import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import homecss from "./home.module.css";
import indexcss from "./index.module.css";
import myimage from "../Images/iconheader.png";
import template1 from "../Images/template1.png";
import template2 from '../Images/portfoilo2.png'
function Home() {
  let {id}=useParams();
  const [message, setMessage] = useState("");
  const { setToken, token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:3050/api/users/home", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setToken(null);
      });

     
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  const handlePreview1 = () => {
    navigate(`/portfolio1/${id}`);
  };
  const handlePreview2 = () => {
    navigate(`/portfolio2/${id}`);
  };
  const handleCreate=(Id)=>{
    navigate(`/build/${id}/${Id}`)
  }
  return (
    <div className={`container-fluid ${homecss.container}`}>
      <div className={`row ${indexcss.row1}`}>
        <div className="col-6">
          <img src={myimage}></img>
        </div>
        <div className="col-6">
          <p>Free Portfolio</p>
        </div>
      </div>

      <div className={`row ${homecss.row}`}>
        <div className="col-6">
          <h6>{message}</h6>
        </div>
        <div className="col-6">
          <button id={homecss.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div class={`row ${homecss.row2}`}>
        <div class={`col-sm-6 ${homecss.templates}`}>
          <img class="img-fluid" src={template1} alt="templateImage"></img>
          <div>
            <button onClick={handlePreview1}>Preview</button>
            <button onClick={()=>handleCreate('template1')}>Create</button>
          </div>
        </div>
        <div class={`col-sm-6 ${homecss.templates}`}>
          <img class="img-fluid" src={template2} alt="templateImage"></img>
          <div>
            <button onClick={handlePreview2}>Preview</button>
            <button onClick={()=>handleCreate('template2')}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
