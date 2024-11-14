import React, { useEffect, useState } from "react";
import portfolio1css from "./portfolio_one.module.css";
import icon1 from "../Images/serviceIcon.png";
import work1 from "../Images/worksample1.jpg";
import work2 from "../Images/worksample2.jpg";
import work3 from "../Images/worksample3.jpg";
import man from "../Images/adult-1851571_1280.jpg";
import map from "../Images/map.png";
import facebook from "../Images/facebook.png";
import twitter from "../Images/twitter.png";
import instagram from "../Images/instagram.png";
import linkedin from "..//Images/linkedin.png";
import { useParams } from "react-router-dom";
import axios from "axios";
function Portfolio1() {
  const {id} = useParams();
  let userId = id;
  console.log(userId)
  const [name,setName]=useState('Name');
  const [job,setJob]=useState('Job Title');
  const [email,setEmail]=useState('contact@gmail.com');
  const [phone,setPhone]=useState('5555-343-3432');
  const [address,setAddress]=useState('13 Fifth Avenue,New York,NY 198453');
  let jobDescription=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integ nec odio vel nisi consequat sodales non a massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames acturpis egestas. Quisque euismod lectus in velit ultricies, nonvarius risus lacinia. Aenean vehicula elit ac eros fermentum, velvestibulum erat facilisis."
  const [jobDesc,setJobDesc]=useState(jobDescription)
  const [service1, setService1] = useState("Service 1");
  const [service2, setService2] = useState("Service 2");
  const [service3, setService3] = useState("Service 3");
  const [serviceDesc1, setServiceDesc1] = useState("Some quick example text to build on the card title and make up the bulk of the cards content.','Service 3','Some quick example text to build on the card title and make up the bulk of the cards content.");
  const [serviceDesc2, setServiceDesc2] = useState("Some quick example text to build on the card title and make up the bulk of the cards content.','Service 3','Some quick example text to build on the card title and make up the bulk of the cards content.");
  const [serviceDesc3, setServiceDesc3] = useState("Some quick example text to build on the card title and make up the bulk of the cards content.','Service 3','Some quick example text to build on the card title and make up the bulk of the cards content.");
  const[workDesc,setWorkDesc]=useState(jobDescription);
  const[about,setAbout]=useState(jobDescription);
  const [files, setFiles] = useState({
    image: man,
    aboutImage: man,
    work1: work1,
    work2: work2,
    work3: work3,
    serviceIcon1: icon1,
    serviceIcon2: icon1,
    serviceIcon3: icon1,
  });

  const [imageUrls, setImageUrls] = useState({
    image: "",
    aboutImage: "",
    work1: "",
    work2: "",
    work3: "",
    serviceIcon1: "",
    serviceIcon2: "",
    serviceIcon3: "",
  });

  useEffect(() => {
     
    axios
    .get(`http://localhost:3050/api/templates/${id}`)
    .then((res) => {
      if (res.data === null) {
        console.log("No details found");
      } else {
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

    axios
      .get(`http://localhost:3050/api/uploads/${userId}`)
      .then((res) => {
        const data = res.data;
        if (data !== null) {
          setImageUrls({
            image: data.image,
            aboutImage: data.aboutImage,
            work1: data.work1,
            work2: data.work2,
            work3: data.work3,
            serviceIcon1: data.serviceIcon1,
            serviceIcon2: data.serviceIcon2,
            serviceIcon3: data.serviceIcon3,
          });
        }
      })
      .catch((err) => {
        console.log("Error in fetching data");
      });
      console.log(imageUrls[files.image])
   
  }, []);
  return (
    <>
       
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id={portfolio1css.nav}>
        <div class="container-fluid">
          <a class="navbar-brand">
            <span id="name">{name}</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              marginBottom: "5px",
              marginRight: "5px",
              border: "1px solid ",
            }}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#name" id={portfolio1css.links}>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#works" id={portfolio1css.links}>
                  Works
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#service" id={portfolio1css.links}>
                  Services
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#about" id={portfolio1css.links}>
                  About Me
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact" id={portfolio1css.links}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container-fluid" id={portfolio1css.imageHeight}>
        <div class="row">
          <div class="col-12 col-sm-6">
            <h1
              class="pt-5 overflow-y-hidden text-light"
              id={portfolio1css.jobTitle}
            >
              {job}
            </h1>
            <p>{jobDesc}</p>
          </div>
          <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center">
            <img
              src={imageUrls.image}
              alt="photo"
              style={{ width: "250px", height: "250px", borderRadius: "10%" }}
            ></img>
          </div>
        </div>
      </div>
      <div class="container bg-warning mt-2 mb-2 pb-3">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="pt-3 pb-3 overflow-y-hidden m-auto">
              <span id="service">Services</span>
            </h1>
          </div>

          <div class="col-12 col-sm-4">
            <div className="card mb-3" style={{height:'400px'}}>
              <img
                class="card-img-top d-block mt-3 mx-auto fa-spin"
                src={imageUrls.serviceIcon1}
                alt="Card image cap"
                style={{ width: "50px", height: "50px" }}
              />
              <div class="card-body" >
                <h5 class="card-title overflow-y-hidden text-center">
                  {service1}
                </h5>
                <p class="card-text">{serviceDesc1}</p>
                <a
                  href="#"
                  class="btn btn-primary d-block mx-auto "
                  style={{ width: "130px" }}
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="card mb-3" style={{height:'400px'}}>
              <img
                class="card-img-top d-block mt-3 mx-auto fa-bounce"
                src={imageUrls.serviceIcon2}
                alt="Card image cap"
                style={{ width: "50px", height: "50px" }}
              />
              <div class="card-body">
                <h5 class="card-title overflow-y-hidden text-center">
                  {service2}
                </h5>
                <p class="card-text">{serviceDesc2}</p>
                <a
                  href="#"
                  class="btn btn-primary d-block mx-auto  "
                  style={{ width: "130px" }}
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="card" style={{height:'400px'}}>
              <img
                class="card-img-top mt-3 d-block mx-auto fa-spin"
                src={imageUrls.serviceIcon3}
                alt="Card image cap"
                style={{ width: "50px", height: "50px" }}
              />
              <div class="card-body">
                <h5 class="card-title overflow-y-hidden text-center">
                  {service3}
                </h5>
                <p class="card-text">{serviceDesc3}</p>
                <a
                  href="#"
                  class="btn btn-primary d-block mx-auto "
                  style={{ width: "130px" }}
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-2 mb-2">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="pt-3 pb-3 m-auto">
              <span id="works">Works</span>
            </h1>
            <p>{workDesc}</p>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <img class="img-fluid" src={imageUrls.work1} alt="works sample"></img>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <img class="img-fluid" src={imageUrls.work2} alt="works sample"></img>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <img class="img-fluid" src={imageUrls.work3} alt="works sample"></img>
          </div>
        </div>
      </div>

      <div class="container  mt-2 mb-2">
        <div class="row">
          <div class="col-12 col-sm-6">
            <h1 class="pt-3 pb-3 overflow-y-hidden m-auto">
              <span id="about">About Me</span>
            </h1>
            <p>{about}</p>
          </div>
          <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center">
            <img
              src={imageUrls.aboutImage}
              alt="photo"
              style={{ width: "300px", height: "300px", borderRadius: "50%" }}
            ></img>
          </div>
        </div>
      </div>

      <div class="container-fluid pb-3 bg-dark">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="pt-3 pb-3 overflow-y-hidden m-auto">
              <span id="contact">Contact Me</span>
            </h1>
          </div>
        </div>
        <div class="row pb-2">
          <div class="col-12">
            <p>{jobDesc}</p>
          </div>
          <div class="col-12 col-sm-6">
            <a href="" class="d-block text-center text-decoration-none">
              <span style={{ color: "yellow" }}>☏</span> {phone}
            </a>
            <a href="" class="d-block text-center text-decoration-none">
              {" "}
              <span style={{ color: "yellow" }}>📧 </span> {email}
            </a>
            <a href="" class="d-block text-center text-decoration-none">
              <img
                src={map}
                alt="location"
                style={{ color: "yellow", width: "20px", height: "20px" }}
              />{" "}
              {address}
            </a>
          </div>
          <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center">
            <a href="#" style={{ paddingRight: "10px" }} class="fa-beat">
              <img
                src={facebook}
                alt="facebookIcon"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
            <a href="#" style={{ paddingRight: "10px" }} class="fa-beat">
              <img
                src={linkedin}
                alt="linkedinIcon"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
            <a href="#" style={{ paddingRight: "10px" }} class="fa-beat">
              <img
                src={twitter}
                alt="twitterIcon"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
            <a href="#" style={{ paddingRight: "10px" }} class="fa-beat">
              <img
                src={instagram}
                alt="instagramIcon"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Portfolio1;
