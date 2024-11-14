import React, { useEffect, useState } from "react";
import axios from "axios";
import buildercss from "./builder.module.css";
import { useNavigate, useParams } from "react-router-dom";

function ImageBuilder() {
  const { userId, templateId } = useParams();
  const [found, setFound] = useState(false);
  const navigate = useNavigate();
  // State for file inputs
  const [files, setFiles] = useState({
    image: null,
    aboutImage: null,
    work1: null,
    work2: null,
    work3: null,
    serviceIcon1: null,
    serviceIcon2: null,
    serviceIcon3: null,
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

          setFound(true);
        }
      })
      .catch((err) => {
        console.log("Error in fetching data");
      });
  }, [userId]);
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {}; // Track fields to be updated
    const formData = new FormData();

    // Append non-file fields
  
      formData.append("templateId", templateId);
    
   
    formData.append("userId", userId);

    // Only add files that are new (not null)
    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
        updatedFields[key] = files[key];
      }
    }
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    if (found) {
      try {
        await axios.put(
          `http://localhost:3050/api/uploads/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Files updated successfully!");
        navigate(`/home/${userId}`);
      } catch (error) {
        console.error("Error updating files:", error);
        alert("No need to Update");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3050/api/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Files uploaded successfully!");
        navigate(`/home/${userId}`);
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Upload failed.");
      }
    }
  };
  return (
    <div className="container w-85 mt-4 bg-warning pb-3 pt-3">
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-12 overflow-y-hidden">
          <p class="h4" id={buildercss.headline}>
            Image Details
          </p>
        </div>

        
        {Object.keys(files).map((field) => (
          <div className="col-12" key={field}>
            <label htmlFor={field} className="form-label">
              {`Image for ${field}`}
            </label>
            <input
              type="file"
              className="form-control"
              name={field}
              onChange={handleFileChange}
            />
            {imageUrls[field] && (
              <div className="mt-2">
                <img
                  src={imageUrls[field]}
                  alt={`${field} preview`}
                  width="100"
                  height="100"
                />
              </div>
            )}
          </div>
        ))}

        <div className="col-12">
          <button className="btn btn-primary w-6 m-4" type="submit">
            Submit
          </button>
          <button className="btn btn-primary w-6 m-4" onClick={(()=>navigate(`/home/${userId}`))}>
            GoHome
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageBuilder;
