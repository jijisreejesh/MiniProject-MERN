import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import indexcss from "./index.module.css";
import myimage from "../Images/iconheader.png";
import buildercss from "./builder.module.css";
import { useParams } from "react-router-dom";
import ImageBuilder from "./ImageBuilder";
function Builder() {
  const { id, Id } = useParams();
 const navigate=useNavigate();
 const [found,setFound]=useState(false);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  //for Services
  const [service1, setService1] = useState("");
  const [service2, setService2] = useState("");
  const [service3, setService3] = useState("");
  const [serviceDesc1, setServiceDesc1] = useState("");
  const [serviceDesc2, setServiceDesc2] = useState("");
  const [serviceDesc3, setServiceDesc3] = useState("");

  const [workDesc, setWorkDesc] = useState("");

  const [about, setAbout] = useState("");

  const [message, setMessage] = useState("");
  const { setToken, token } = useContext(AuthContext);
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

    axios
      .get(`http://localhost:3050/api/templates/${id}`)
      .then((res) => {
        if(res.data===null)
        {
          console.log('No details found');
          
        }
        else{

        setFound(true);
        setName(res.data.name);
        setJob(res.data.job);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setJobDesc(res.data.jobDesc);
        setWorkDesc(res.data.workDesc);
        setAddress(res.data.address);
        setService1(res.data.service1);
        setService2(res.data.service2);
        setService3(res.data.service3);
        setServiceDesc1(res.data.serviceDesc1);
        setServiceDesc2(res.data.serviceDesc2);
        setServiceDesc3(res.data.serviceDesc3);
        setAbout(res.data.about);
      }
      })
      .catch((err) => {
        console.log("Error in deleting data", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      templateId: Id,
      userId: id,
      name,
      job,
      email,
      phone,
      address,
      jobDesc,
      workDesc,
      service1,
      service2,
      service3,
      serviceDesc1,
      serviceDesc2,
      serviceDesc3,
      about,
    };
     
    if(found)
    {
      
      axios.put(`http://localhost:3050/api/templates/${id}`,details)
      .then((res)=>{
         alert("successfully updated");
        navigate(`/imageBuild/${details.userId}/${details.templateId}`)
      })
      .catch((err)=>{
        console.log('Error in updation : ',err);
        
      })
    }
    else{
      axios.post("http://localhost:3050/api/templates", details)
      .then((res) => {
        //  alert("Form submitted Successfully");
        navigate(`/imageBuild/${details.userId}/${details.templateId}`)
      });
    }
   
  };

 
   
  return (
    <div className="container-fluid vh-100">
      <div className={`row ${indexcss.row1}`}>
        <div className="col-6">
          <img src={myimage}></img>
        </div>
        <div className="col-6">
          <p>Free Portfolio</p>
        </div>
      </div>
      <div className="container w-85 mt-4 bg-warning pb-3 pt-3">
        <form class="row g-3" onSubmit={handleSubmit}>
          <div class="col-12 overflow-hidden">
            <p class="h4" id={buildercss.headline}>
              Personsal details
            </p>
          </div>
          <div class="col-md-6">
            <label htmlFor="validationServer01" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer01"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label htmlFor="validationServer02" class="form-label">
              Job Title
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer02"
              required
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-6">
            <label htmlFor="validationServerUsername" class="form-label">
              Email Id
            </label>
            <div class="input-group has-validation">
              <input
                type="email"
                class="form-control"
                id="validationServerUsername"
                aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                id="validationServerUsernameFeedback"
                class="invalid-feedback"
              >
                Please choose an Email Id
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <label htmlFor="validationServer02" class="form-label">
              Phone Number
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer02s"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-4">
            <label htmlFor="validationTextarea" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <div class="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>

          <div class="mb-3">
            <label htmlFor="validationTextarea" class="form-label">
              Explain about you briefly
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            ></textarea>
            <div class="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>

          <div class="mb-3">
            <label htmlFor="validationTextarea" class="form-label">
              Explain about your works briefly
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={workDesc}
              onChange={(e) => setWorkDesc(e.target.value)}
            ></textarea>
          </div>

          <div class="col-12">
            <label htmlFor="validationServer02" class="form-label">
              Service Title1
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer02"
              required
              value={service1}
              onChange={(e) => setService1(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label htmlFor="validationTextarea" class="form-label">
              Explain about your service briefly
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={serviceDesc1}
              onChange={(e) => setServiceDesc1(e.target.value)}
            ></textarea>
            <div class="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>

          <div class="col-12">
            <label htmlFor="validationServer02" class="form-label">
              Service Title2
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer02"
              required
              value={service2}
              onChange={(e) => setService2(e.target.value)}
            />
            <div class="mb-3">
              <label htmlFor="validationTextarea" class="form-label">
                Explain about your service briefly
              </label>
              <textarea
                class="form-control"
                id="validationTextarea"
                placeholder="Required example textarea"
                required
                value={serviceDesc2}
                onChange={(e) => setServiceDesc2(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div class="col-12">
            <label htmlFor="validationServer02" class="form-label">
              Service Title3
            </label>
            <input
              type="text"
              class="form-control"
              id="validationServer02"
              required
              value={service3}
              onChange={(e) => setService3(e.target.value)}
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="mb-3">
            <label htmlFor="validationTextarea" class="form-label">
              Explain about your service briefly
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={serviceDesc3}
              onChange={(e) => setServiceDesc3(e.target.value)}
            ></textarea>
            <div class="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>
          <div class="mb-3">
            <label htmlFor="validationTextarea" class="form-label">
              Introduce Your self with past Experience,strengths etc
            </label>
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Required example textarea"
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
          <div class="col-12">
              <button class="btn btn-primary w-6 " type="submit" >
               Submit
              </button>
              
            </div>
            {/* <ImageBuilder id={id} Id={Id} /> */}
        </form>
      </div>
    </div>
  );
}

export default Builder;
