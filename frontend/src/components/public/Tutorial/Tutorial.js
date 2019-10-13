import React, { useState } from "react";
import Viewing from "./Steps/Viewing";
import Listing from "./Steps/Listing";
import Last from "./Steps/Last";
import Copyright from "../../Copyright";

const handleStep = step => {
  switch (step) {
    case 1:
      return <Viewing />;
    case 2:
      return <Listing />;
    case 3:
      return <Last />;
    default:
      return null;
  }
};

const Tutorial = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="container">
      <ul className="progressbar">
        <div className="animated-text-left">
          {step === 1 ? <li className="active">Viewing</li> : <li>Viewing</li>}
        </div>
        <div className="animated-text-bottom">
          {step === 2 ? <li className="active">Listing</li> : <li>Listing</li>}
        </div>
        <div className="animated-text-right">
          {step === 3 ? <li className="active">Profit</li> : <li>Profit</li>}
        </div>
      </ul>
      <div className="animated-text-bottom" style={{ paddingTop: "4rem" }}>
        {handleStep(step)}
      </div>
      <div>
        {step !== 1 ? (
          <button
            style={{ float: "left" }}
            className="tutorial-button button-pink button-animated"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {step !== 3 ? (
          <button
            style={{ float: "right" }}
            className="tutorial-button button-pink button-animated"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="text-center">
        <Copyright />
      </div>
    </div>
  );
};

export default Tutorial;
