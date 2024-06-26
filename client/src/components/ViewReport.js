// ViewReport.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewReport = () => {
  const { regionName } = useParams();
  const [selectedStation, setSelectedStation] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [crimeData, setCrimeData] = useState([]);
  const [error, setError] = useState(null);
  const [hide, setHide] = useState(true);

  // Define police stations based on regions
  const regions = {
    north: [
      "Borivali Police Station",
      "Kandivali Police Station",
      "Goregaon Police Station",
      "Jogeshwari Police Station",
    ],
    south: [
      "Malabar Hill Police Station",
      "CSMT Police Station",
      "Byculla Police Station",
    ],
    east: [
      "Ghatkopar Police Station",
      "Chembur Police Station",
      "Vikhroli Police Station",
      "Mulund Police Station",
    ],
    west: [
      "Andheri Police Station",
      "Vile Parle Police Station",
      "Bandra Police Station",
      "Mahim Police Station",
    ],
    central: [
      "Dadar Police Station",
      "Parel Police Station",
      "Sion Police Station",
    ],
  };

  // Function to fetch crime data from backend
  const fetchCrimeData = async () => {
    if (!startDate || !endDate || !selectedStation) {
      setError(
        "Please select a police station and enter both start and end dates."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/get_crime_info",
        {
          startDate,
          endDate,
          policeStation: selectedStation,
        }
      );
      setCrimeData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching crime data:", error);
      setError("Error fetching crime data. Please try again later.");
    }
  };

  // Effect to log regionName and perform initial actions if needed
  useEffect(() => {
    console.log("Region Name:", regionName);
    // Additional initialization or data fetching logic if needed
  }, [regionName]);

  // Render component JSX
  return (
    <div className="body">
      <div className="region">
        <div className="h1">
          <div className="region_name">
            <p className="text1">
              {regionName.toUpperCase()} REGION POLICE WELCOMES YOU
            </p>
          </div>
        </div>

        <div className="select_ps">
          <p className="text2">Select Police Station:</p>
        </div>

        <div className="ps_name">
          {regions[regionName]?.map((station, idx) => (
            <button
              key={idx}
              className="enter_button"
              onClick={() => setSelectedStation(station)}
            >
              {station}
            </button>
          ))}
        </div>
        <Link to="/">
          <button className="back_button">Go Back</button>
        </Link>
      </div>

      {selectedStation && (
        <div>
          <h2>{selectedStation} Crime Data</h2>
          <div className="date_form">
            <div className="text_div">
              <p className="text1">Enter the date range for the report</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchCrimeData();
              }}
            >
              <div className="date">
                <div className="start_date">
                  <input
                    className="input_1"
                    type="date"
                    placeholder="Enter initial date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startDate"
                    required
                  />
                </div>
                <div className="last_date">
                  <input
                    className="input_1"
                    type="date"
                    placeholder="Enter final date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    name="endDate"
                    required
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  className="join-button"
                  type="submit"
                  value="CRIME INFO"
                />
              </div>
            </form>

            {error && <div className="error-message">{error}</div>}

            {crimeData.length > 0 && (
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>FIR No</th>
                      <th>Station Name</th>
                      <th>IPC No</th>
                      <th>Incident Date</th>
                      <th>Incident Time</th>
                      <th>Reporting Date</th>
                      <th>Case Status</th>
                      <th>Incident Details</th>
                      <th>Investigating Officer</th>
                      <th>Officer Aadhar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crimeData.map((crime, index) => (
                      <tr key={index}>
                        <td>{crime.firno}</td>
                        <td>{crime.stationname}</td>
                        <td>{crime.ipcno}</td>
                        <td>{crime.incidentdate}</td>
                        <td>{crime.incidenttime}</td>
                        <td>{crime.reportingdate}</td>
                        <td>{crime.casestatus}</td>
                        <td>{crime.incidentdetails}</td>
                        <td>{crime.investigatingofficer}</td>
                        <td>{crime.daadhar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;
