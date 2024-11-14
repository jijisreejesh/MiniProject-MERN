import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import indexcss from "./index.module.css";
import myimage from "../Images/iconheader.png";
import { AuthContext } from "./AuthContext";
import axios from 'axios';
export default function Login() {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  let { setToken ,token} = useContext(AuthContext);
  function handleCancel() {
    navigate("/");
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const details = { email, password };
    axios
      .post("http://localhost:3050/api/users/login", details)
      .then((res) => {
        if (res.data === "mismatch") alert("Email Id mismatch");
        else if (res.data === "password mismatch")
          alert("Password is incorrect");
        else {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate(`/home/${res.data.id}`);
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
         setToken(null);
        localStorage.removeItem("token");
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data); // Set the error message if present in the error response
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  }
  return (
    <div className="container-fluid vh-100 bg-primary">
      <div className={`row ${indexcss.row1}`}>
      <div className="col-6">
          <img src={myimage}></img>
          </div>
          <div className="col-6">
        <p>Free Portfolio</p>
        </div>
      </div>
      <div className="row">
        <div className={`col-md-6 ${indexcss.asideDiv} `}>
          <aside className={indexcss.aside}>
            <p>Build Your Portfolio By Choosing Template</p>
          </aside>
        </div>
        <div className={`col-md-6 ${indexcss.formDiv} vh-100`}>
          <form id={indexcss.form} onSubmit={handleSubmit}>
            <label htmlFor="email1" className={indexcss.lbl}>
              Enter your email address
            </label>
            <input type="email" id="email1" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <label className={indexcss.lbl} htmlFor="password1">
              Enter the Password
            </label>
            <input
              type="password"
              id="password1"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
              required
            />
            <section id={indexcss.sectionBtn}>
              <button type="submit">Login</button>
              <button onClick={handleCancel}>Cancel</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}
