import React, { useState, useEffect } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { Offcanvas } from "./offcanvas";
import Nav from "./Nav";


export const Home = () => {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [imgAvail, setImageAvail] = useState(false);
  const [imgClass, setImgClass] = useState("Classification");
  const [receivedData, setReceivedData] = useState("");
  const [recievedn, setrecievedn] = useState(false);

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setUploadedFileName(event.target.files[0].name);
    previewImage(event.target.files[0]);
    setImageAvail(true);
    setrecievedn(false);
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setUploadedFileName(droppedFile.name);
    previewImage(droppedFile);
    setImageAvail(true);
    setrecievedn(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setrecievedn(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classification", imgClass);
    try {
      await axios.post("http://127.0.0.1:5030/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": window.localStorage.getItem("token"),
        },
      });
      alert("File uploaded successfully!");
      setUploadedFileName("");
    } catch (err) {
      alert("Error uploading file");
    }
    setrecievedn(false);
  };

  // const modifyUpload = async ()=>{

  // }

  function imageClass(name) {
    setImgClass(name);
  }

  var link = "http://localhost:5030/";
  const handleDataFromChild = (data) => {
    console.log(data);
    const parts = data.split("/");
    const encodedParts = parts.map((part) => encodeURIComponent(part));
    const encodedUrl = encodedParts.join("/");
    setImageUrl(link + encodedUrl);
    // console.log(link + encodedUrl)
    setUploadedFileName(parts[parts.length - 1]);
    const formData = new FormData();
    formData.append("filename", parts[parts.length - 1]);
    // console.log(window.localStorage.getItem("token"))
    axios
      .post("http://localhost:5030/get_updated_classification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setImgClass(res.data.classification);
      });
    setImageAvail(true);
  };

  function TypingText({ text }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 90); // Adjust typing speed here (milliseconds)

      return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
  }

  return (
    <div>
      <Offcanvas sendDataToParent={handleDataFromChild} />
      <div>
        <div
          className="drop-zone mt-20"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {uploadedFileName ? (
            <div
              style={{
                width: "400px",
                height: "50px",
                alignContent: "center",
                padding: "4px",
              }}
            >
              {uploadedFileName}
            </div>
          ) : (
            <div
              // style={{
              //   width: "400px",
              //   height: "50px",
              //   alignContent: "center",
              //   padding: "4px",
              //   borderColor: "black"
              // }}
              className="ml-72"
              style={{ marginTop: "24%"}}
            >
              <TypingText text="Drag & drop file here or click to select file"/><br/>
            </div>
          )}
        </div>
        <div
          className="absolute"
          style={{ marginLeft: "60%", marginTop: "4%" }}
        >
          <label
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "10%",
              marginTop: "2%",
              width:"300px",
              height:"50px",
            }}
            className="zoom-container"
          >
            <p className="zoom-element ml-5">Choose files<i class="fa-solid fa-file" style={{ fontSize: "20px" }}></i></p>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div
          className="absolute zoom-container"
          style={{ marginLeft: "80%", marginTop: "2%", height: "100px" }}
        >
          <button
            onClick={handleUpload}
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "10%",
              marginTop: "3%",
            }}
            className="border p-3 px-5 rounded-pill zoom-element"
          >
            <i class="fa-solid fa-upload" style={{ fontSize: "20px" }}></i>
            Upload
          </button>
        </div>
      </div>
      <div>
        {imgAvail ? (
          <div class="dropdown">
            <a
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {imgClass}
            </a>

            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" onClick={() => imageClass("airplane")}>
                  airplane
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  onClick={() => imageClass("automobile")}
                >
                  automobile
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("bird")}>
                  bird
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("cat")}>
                  cat
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("deer")}>
                  deer
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("dog")}>
                  dog
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("frog")}>
                  frog
                </a>
              </li>
              <li>
                {/* <a class="dropdown-item" onclick={() => imageClass("horse")}> */}
                <a class="dropdown-item" onClick={() => imageClass("frog")}>
                  horse
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("ship")}>
                  ship
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => imageClass("truck")}>
                  truck
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <img
          src={imageUrl}
          style={{ width: "50%", height: "50%" }}
          className="ml-12 mt-5"
        />
      </div>
    </div>
  );
};
