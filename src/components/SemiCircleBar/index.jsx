import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./styles.css";

const SemiCircleBar = ({ smallCounter, bigCounter, smallerCounter }) => {
  const initialDeg = {
    small: 0.0,
    big: 0.0,
    smaller: 0.0,
  };
  const [deg, setDeg] = useState(initialDeg);

  useEffect(() => {
    setDeg({ small: smallCounter, big: bigCounter, smaller: smallerCounter });
  }, [smallCounter, bigCounter, smallerCounter]);

  const percentageToDeg = (percentage) => {
    return parseFloat(percentage / 100) * 180;
  };

  return (
    <div>
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
        <div
          className="smaller-circle"
          style={{
            transform: `rotate(${percentageToDeg(deg.smaller) - 45}deg)`,
          }}
        ></div>
      </div>
      <br />
      <div className="graph-counter">
        <span className="graph-text big">
          <CountUp
            start={0}
            end={deg.big}
            duration={1}
            useGrouping={true}
            decimals={2}
            delay={1}
          />
          %
        </span>
        <span className="graph-text small">
          <CountUp
            start={0}
            end={deg.small}
            duration={1}
            useGrouping={true}
            decimals={2}
            delay={1}
          />
          %
        </span>
        <span className="graph-text smaller">
          <CountUp
            start={0}
            end={deg.smaller}
            duration={1}
            useGrouping={true}
            decimals={2}
            delay={1}
          />
          %
        </span>
      </div>
    </div>
  );
};

export default SemiCircleBar;
