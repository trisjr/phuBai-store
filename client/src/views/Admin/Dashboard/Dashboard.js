import React, { useState } from "react";

import { useTitle } from "../../../hooks/useTitle";

import DashboardStyles from "./DashboardStyles.module.scss";
import TextField from "../../../components/lib/TextField/TextField";
import Select from "../../../components/lib/Select/Select";
import Button from "../../../components/lib/Button/Button";
import Rating from "../../../components/lib/Rating/Rating";
import Slider from "../../../components/lib/Slider/Slider";

function Dashboard() {
  useTitle("Dashboard");

  const initState = {
    textField: "",
    select: "",
    rating: 2,
    slider: 30,
  };

  const [result, setResult] = useState(initState);
  const { textField, select, rating, slider } = result;

  const array = [
    {
      value: "Value 1",
    },
    {
      value: "Value 2",
    },
    {
      value: "Value 3",
    },
    {
      value: "Value 4",
    },
    {
      value: "Value 5",
    },
  ];

  const handleAction = (action, value) => {
    switch (action) {
      case "handleChangeTextField": {
        setResult({
          ...result,
          textField: value,
        });
        break;
      }
      case "handleSelect": {
        setResult({
          ...result,
          select: value,
        });
        break;
      }
      case "handleChangeRating": {
        setResult({
          ...result,
          rating: value,
        });
        break;
      }
      case "handleChangeSlider": {
        setResult({
          ...result,
          slider: value,
        });
        break;
      }
      case "logResult": {
        console.log(result);
        break;
      }

      default:
        return;
    }
  };

  return (
    <div className={DashboardStyles["dashboard"]}>
      <div className={DashboardStyles["item"]}>
        <div className={DashboardStyles["title"]}>Text field</div>
        <div className={DashboardStyles["content"]}>
          <TextField
            value={textField}
            title={"Title"}
            onChange={(value) => {
              handleAction("handleChangeTextField", value);
            }}
          />
        </div>
      </div>
      <div className={DashboardStyles["item"]}>
        <div className={DashboardStyles["title"]}>Select</div>
        <div className={DashboardStyles["content"]}>
          <Select
            title={"Select"}
            array={array}
            selected={select}
            onSelect={(value) => handleAction("handleSelect", value)}
          />
        </div>
      </div>
      <div className={DashboardStyles["item"]}>
        <div className={DashboardStyles["title"]}>Button</div>
        <div className={DashboardStyles["content"]}>
          <Button
            variant={"contained"}
            color={"success"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
          <Button
            variant={"contained"}
            color={"error"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
          <Button
            variant={"contained"}
            color={"warning"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
          <Button
            variant={"outlined"}
            color={"success"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
          <Button
            variant={"outlined"}
            color={"error"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
          <Button
            variant={"outlined"}
            color={"warning"}
            onClick={() => handleAction("logResult")}
          >
            Button
          </Button>
        </div>
      </div>
      <div className={DashboardStyles["item"]}>
        <div className={DashboardStyles["title"]}>Rating</div>
        <div className={DashboardStyles["content"]}>
          <Rating
            value={rating}
            onChange={(value) => handleAction("handleChangeRating", value)}
          />
        </div>
      </div>
      <div className={DashboardStyles["item"]}>
        <div className={DashboardStyles["title"]}>Slider</div>
        <div className={DashboardStyles["content"]}>
          <Slider
            value={slider}
            width={400}
            onChange={(value) => handleAction("handleChangeSlider", value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
