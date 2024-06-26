// Report.js
import React from "react";
import { Link } from "react-router-dom";
import northImage from "./north.png";
import southImage from "./south.png";
import eastImage from "./east.png";
import westImage from "./west.png";
import centralImage from "./central.png";
import "./Report.css";

const Report = () => {
  const regions = [
    {
      name: "NORTH REGION POLICE",
      image: northImage,
      region: "north",
    },
    {
      name: "SOUTH REGION POLICE",
      image: southImage,
      region: "south",
    },
    {
      name: "EAST REGION POLICE",
      image: eastImage,
      region: "east",
    },
    {
      name: "WEST REGION POLICE",
      image: westImage,
      region: "west",
    },
    {
      name: "CENTRAL REGION POLICE",
      image: centralImage,
      region: "central",
    },
  ];

  return (
    <div>
      <div className="head">
        <p className="head_text">
          Select the region whose report is to be viewed
        </p>
      </div>

      <div className="region-container">
        {regions.map((region, index) => (
          <div key={index} className="region">
            <div className="text1">
              <p className="text1_1">{region.name}</p>
            </div>
            <div className="image_grid">
              <img
                className="image1"
                src={region.image}
                alt={region.name}
                height="300px"
              />
              <div className="btn-1">
                <Link to={`/viewreport/${region.region}`}>
                  <button>{region.name}</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default Report;
