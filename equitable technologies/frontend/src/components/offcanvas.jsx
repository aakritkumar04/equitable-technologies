import React, { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import Nav from "./Nav";

export const Offcanvas = ({ sendDataToParent }) => {
  const [canvas, setcanvas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5030/get_images", {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": window.localStorage.getItem("token"),
          },
        });
        setcanvas(response.data.images);
      } catch (err) {
        alert("Error uploading file");
      }
    };
    fetchData();
  }, []);

  const sendFile = (item) => {
    sendDataToParent(item);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const regex = new RegExp(searchTerm, "i");
    const results = canvas.filter((item) => regex.test(item));

    setSearchResults(results);
  };

  return (
    <div>
      <Nav />
      <button
        class="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        style={{ marginLeft: "90%" }}
      >
        <i class="fa-solid fa-bars"></i>
      </button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            All Images
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="    Search..."
        />
        <div class="offcanvas-body">
          {searchResults.map((result, index) => {
            const fileName = result.split("/").pop();
            return (
              <li
                key={index}
                onClick={() => sendFile(result)}
                className="cursor-pointer"
              >
                {fileName}
              </li>
            );
          })}
        </div>
        <div class="offcanvas-body">
          <p style={{ fontSize: "20px" }}>All Images</p>
          {canvas.map((item, index) => {
            const fileName = item.split("/").pop();
            return (
              <div key={index}>
                <p onClick={() => sendFile(item)} className="cursor-pointer">
                  {fileName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
