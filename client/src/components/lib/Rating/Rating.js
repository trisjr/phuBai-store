import React, { useState } from "react";

import RatingStyles from "./RatingStyles.module.scss";

import { MdStar } from "react-icons/md";
import clsx from "clsx";

function Rating({ readOnly, value, size = 3, onChange }) {
  const [rate, setRate] = useState(value);

  const handleAction = (action, rated) => {
    switch (action) {
      case "handleMouseEnter": {
        if (!readOnly) {
          setRate(rated);
        }
        break;
      }
      case "handleMouseLeave": {
        if (!readOnly) {
          setRate(value);
        }
        break;
      }
      case "handleChange": {
        if (!readOnly) {
          onChange(rated);
        }
        break;
      }

      default:
        return;
    }
  };

  return (
    <div
      className={clsx(
        RatingStyles["rating"],
        readOnly && RatingStyles["readOnly"]
      )}
      style={{ "--star-size": `${size}px` }}
      onMouseLeave={() => handleAction("handleMouseLeave")}
    >
      <i
        className={clsx(
          RatingStyles["star"],
          rate >= 1 && RatingStyles["rated"]
        )}
        onMouseEnter={() => handleAction("handleMouseEnter", 1)}
        onClick={() => handleAction("handleChange", 1)}
      >
        <MdStar />
      </i>
      <i
        className={clsx(
          RatingStyles["star"],
          rate >= 2 && RatingStyles["rated"]
        )}
        onMouseEnter={() => handleAction("handleMouseEnter", 2)}
        onClick={() => handleAction("handleChange", 2)}
      >
        <MdStar />
      </i>
      <i
        className={clsx(
          RatingStyles["star"],
          rate >= 3 && RatingStyles["rated"]
        )}
        onMouseEnter={() => handleAction("handleMouseEnter", 3)}
        onClick={() => handleAction("handleChange", 3)}
      >
        <MdStar />
      </i>
      <i
        className={clsx(
          RatingStyles["star"],
          rate >= 4 && RatingStyles["rated"]
        )}
        onMouseEnter={() => handleAction("handleMouseEnter", 4)}
        onClick={() => handleAction("handleChange", 4)}
      >
        <MdStar />
      </i>
      <i
        className={clsx(
          RatingStyles["star"],
          rate >= 5 && RatingStyles["rated"]
        )}
        onMouseEnter={() => handleAction("handleMouseEnter", 5)}
        onClick={() => handleAction("handleChange", 5)}
      >
        <MdStar />
      </i>
    </div>
  );
}

export default Rating;
