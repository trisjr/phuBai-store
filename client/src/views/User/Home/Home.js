import React from "react";
import { Link } from "react-router-dom";

import { useTitle } from "../../../hooks/useTitle";

import HomeStyles from "./HomeStyles.module.scss";
import Button from "../../../components/lib/Button/Button";

function Dashboard() {
  useTitle("HomePage");

  return (
    <div className={HomeStyles["home"]}>
      <section className={HomeStyles["homeSection"]}>
        <div className={HomeStyles["heading"]}>
          <div className={HomeStyles["headingTitle"]}>HomePage</div>
          <ul className={HomeStyles["headingLink"]}>
            <li className={HomeStyles["link"]}>
              <Link to={"#"}>
                <div className={HomeStyles["href"]}>Contact</div>
              </Link>
            </li>
            <li className={HomeStyles["link"]}>
              <Link to={"#"}>
                <div className={HomeStyles["href"]}>Member</div>
              </Link>
            </li>
            <li className={HomeStyles["link"]}>
              <Link to={"#"}>
                <div className={HomeStyles["href"]}>Group</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={HomeStyles["content"]}>
          <div className={HomeStyles["text"]}>Welcome to my website!</div>
          <div className={HomeStyles["action"]}>
            <Button variant={"contained"} color={"success"}>
              Watch more
            </Button>
            <Button variant={"contained"} color={"primary"} href={"/book"}>
              Book now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
