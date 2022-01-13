import React, { useState } from "react";
import CountUp from "react-countup";
import "./styles.css";

const SemiCircleBar = ({ smallCounter, bigCounter }) => {
  const initialDeg = {
    small: 0,
    big: 0,
  };
  const [deg, setDeg] = useState(initialDeg);

  setTimeout(() => {
    setDeg({ small: smallCounter, big: bigCounter });
  }, 1000);

  const percentageToDeg = (percentage) => {
    return parseFloat(percentage / 100) * 180;
  };

  return (
    <>
      <div className="semi-circle">
        <div
          className="big-circle"
          style={{
            transform: `rotate(${percentageToDeg(deg.big) - 45}deg)`,
          }}
        ></div>
        <div
          className="small-circle"
          style={{
            transform: `rotate(${percentageToDeg(deg.small) - 45}deg)`,
          }}
        ></div>
      </div>
      <br />
      <div className="graph-counter">
        <span className="graph-text big">
          <CountUp start={0} end={deg.big} duration={1} useGrouping={true} />%
        </span>
        <span className="graph-text small">
          <CountUp start={0} end={deg.small} duration={1} useGrouping={true} />%
        </span>
      </div>
    </>
  );
};

export default SemiCircleBar;
