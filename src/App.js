import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TraitPage from "./components/TraitPage";
import FinalMint from "./components/FinalMint";
import './styles/App.css';

const traits = ["color", "bg", "spikes", "philBody", "teeth", "topJaw", "eyes", "top", "neck"];

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          {traits.map((trait, index) => (
            <Route
              key={trait}
              path={`/${trait}`}
              element={
                <TraitPage
                  traitName={trait}
                  nextPath={traits[index + 1] ? `/${traits[index + 1]}` : "/final"}
                />
              }
            />
          ))}
          <Route path="/final" element={<FinalMint />} />
          <Route
            path="/"
            element={
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Fill Your Own Phil.</h1>
                <h1 style={{ fontSize: "36px", marginTop: "0" }}>Design. Generate. Mint.</h1>
                <div
                  style={{
                    maxWidth: "600px",
                    margin: "20px auto",
                    textAlign: "center",
                  }}
                >
                  <h3>How to Connect to Ethereum Classic with MetaMask:</h3>
                  <p>
                    To connect to Ethereum Classic using MetaMask, follow these steps:
                  </p>
                  <ol
                    style={{
                      textAlign: "left",
                      margin: "0 auto",
                      display: "inline-block",
                    }}
                  >
                    <li>
                      Open MetaMask and click on the network dropdown at the top.
                    </li>
                    <li>
                      Choose "Add Network" and enter the following details:
                    </li>
                  </ol>
                  <ul
                    style={{
                      textAlign: "left",
                      margin: "10px auto",
                      display: "inline-block",
                    }}
                  >
                    <li>
                      <b>Network Name:</b> Ethereum Classic
                    </li>
                    <li>
                      <b>RPC URL:</b> https://www.ethercluster.com/etc
                    </li>
                    <li>
                      <b>Chain ID:</b> 61
                    </li>
                    <li>
                      <b>Symbol:</b> ETC
                    </li>
                    <li>
                      <b>Block Explorer URL:</b> https://blockscout.com/etc/mainnet
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;