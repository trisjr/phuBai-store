import React from "react";

import SliderStyles from "./SliderStyles.module.scss";

import { MdVolumeDown, MdVolumeUp } from "react-icons/md";

function Slider({ value = 20, width = 200, onChange }) {
  const handleChange = (value) => {
    if (value <= 0) {
      onChange(0);
    } else {
      if (value >= 100) {
        onChange(100);
      } else onChange(value);
    }
  };

  return (
    <div className={SliderStyles["slider"]} style={{ width: width }}>
      <i className={SliderStyles["icon"]} onClick={() => handleChange(0)}>
        <MdVolumeDown />
      </i>
      <input
        id="progress"
        className={SliderStyles["progress"]}
        type={"range"}
        value={value}
        step={1}
        min={0}
        max={100}
        style={{ "--width": `${value}%` }}
        onChange={(e) => handleChange(parseInt(e.target.value))}
      />
      <i className={SliderStyles["icon"]} onClick={() => handleChange(100)}>
        <MdVolumeUp />
      </i>
    </div>
  );
}

export default Slider;
