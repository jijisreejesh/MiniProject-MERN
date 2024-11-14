import React,{useState} from "react";
import indexcss from "./index.module.css";
import { useNavigate } from "react-router-dom";
import myimage from "../Images/iconheader.png";
import axios from 'axios';
function Index() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    let details={name,email,password};
    axios.post('http://localhost:3050/api/users',details)
    .then((res)=>{
      if(res.data==='User already exists')
      {
        alert("Email Id already exists");
      }
      else{
        alert(res.data.Message);
      }
      setName('');
      setPassword('')
      setEmail('')
    
    })
    .catch((err)=>{
      console.log(err.data);   
    })
  }
  return (
    <div className=" container-fluid vh-100">
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
            <label htmlFor="name" className={indexcss.lbl}>
              Enter your name
            </label>
            <input type="text" id="name" autoComplete="name" value={name} required onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="email1" className={indexcss.lbl}>
              Enter your email address
            </label>
            <input type="email" id="email1" autoComplete="email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
            <label className={indexcss.lbl} htmlFor="password1">
              Enter the Password
            </label>
            <input
              type="password"
              id="password1"
              value={password}
              pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
              required
              autoComplete="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <section id={indexcss.sectionBtn}>
              <button type="submit">SignUp</button>
              <button onClick={handleLogin}>LogIn</button>
            </section>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Index;
