import React, { useState } from "react";
import Viewing from "./Steps/Viewing";
import Listing from "./Steps/Listing";
import Last from "./Steps/Last";

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
        {step === 1 ? (
          <li className="active">Viewing products</li>
        ) : (
          <li>Viewing products</li>
        )}
        {step === 2 ? (
          <li className="active">Listing products</li>
        ) : (
          <li>Listing products</li>
        )}
        {step === 3 ? <li className="active">Profit</li> : <li>Profit</li>}
      </ul>
    </div>
  );
};

export default Tutorial;
