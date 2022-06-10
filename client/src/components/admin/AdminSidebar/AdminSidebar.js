import clsx from "clsx";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { OptionContext } from "../../../contexts/OptionContext";

import {
  MdDashboard,
  MdMarkunreadMailbox,
  MdFlight,
  MdFlightLand,
  MdEditLocationAlt,
  MdOutlineManageAccounts,
  MdOutlineAirlineSeatReclineNormal,
  MdChair,
} from "react-icons/md";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaRoute, FaTicketAlt } from "react-icons/fa";

function AdminSidebar({ Styles }) {
  const {
    optionState: { theme, sidebar },
  } = useContext(OptionContext);
  const [collapse, setCollapse] = useState(true);
  const [selected, setSelected] = useState(
    window.location.pathname.split("/")[2]
      ? window.location.pathname.split("/")[2]
      : "dashboard"
  );

  const handleOpenCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div
      className={clsx(
        "sidebar",
        sidebar,
        Styles.sidebar,
        Styles[sidebar],
        Styles[theme]
      )}
    >
      <div className={Styles.body}>
        <div className={Styles.part}>
          <Link
            to="/admin"
            onClick={() => {
              setSelected("dashboard");
            }}
          >
            <div
              className={clsx(
                Styles.item,
                selected === "dashboard" ? Styles.active : null
              )}
            >
              <i className={Styles.icon}>
                <MdDashboard className={Styles.svg} />
              </i>
              <div className={Styles.title}>Dashboard</div>
            </div>
          </Link>
        </div>
        <div className={Styles.part}>
          <div className={Styles.part__title}>
            <div className={Styles.text}>Manager</div>
            <i className={Styles.icon} onClick={() => handleOpenCollapse()}>
              {collapse ? (
                <BsChevronDown className={Styles.svg} />
              ) : (
                <BsChevronUp className={Styles.svg} />
              )}
            </i>
          </div>
          <div
            className={clsx(
              Styles.collapse,
              collapse ? Styles.open : Styles.close
            )}
          >
            <Link
              to="/admin/airline"
              onClick={() => {
                setSelected("airline");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "airline" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdMarkunreadMailbox className={Styles.svg} />
                </i>
                <div className={Styles.title}>Airline</div>
              </div>
            </Link>
            <Link
              to="/admin/airport"
              onClick={() => {
                setSelected("airport");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "airport" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdEditLocationAlt className={Styles.svg} />
                </i>
                <div className={Styles.title}>Airport</div>
              </div>
            </Link>
            <Link
              to="/admin/router"
              onClick={() => {
                setSelected("router");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "router" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <FaRoute className={Styles.svg} />
                </i>
                <div className={Styles.title}>Router</div>
              </div>
            </Link>
            <Link
              to="/admin/flight"
              onClick={() => {
                setSelected("flight");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "flight" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdFlightLand className={Styles.svg} />
                </i>
                <div className={Styles.title}>Flight</div>
              </div>
            </Link>
            <Link
              to="/admin/plane"
              onClick={() => {
                setSelected("plane");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "plane" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdFlight className={Styles.svg} />
                </i>
                <div className={Styles.title}>Plane</div>
              </div>
            </Link>
            <Link
              to="/admin/seatType"
              onClick={() => {
                setSelected("seatType");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "seatType" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdChair className={Styles.svg} />
                </i>
                <div className={Styles.title}>Seat Type</div>
              </div>
            </Link>
            <Link
              to="/admin/seat"
              onClick={() => {
                setSelected("seat");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "seat" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdOutlineAirlineSeatReclineNormal className={Styles.svg} />
                </i>
                <div className={Styles.title}>Seat</div>
              </div>
            </Link>
            <Link
              to="/admin/customer"
              onClick={() => {
                setSelected("customer");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "customer" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <MdOutlineManageAccounts className={Styles.svg} />
                </i>
                <div className={Styles.title}>Customer</div>
              </div>
            </Link>
            <Link
              to="/admin/ticket"
              onClick={() => {
                setSelected("ticket");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "ticket" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <FaTicketAlt className={Styles.svg} />
                </i>
                <div className={Styles.title}>Ticket</div>
              </div>
            </Link>
            <Link
              to="/admin/bill"
              onClick={() => {
                setSelected("bill");
              }}
            >
              <div
                className={clsx(
                  Styles.item,
                  selected === "bill" ? Styles.active : null
                )}
              >
                <i className={Styles.icon}>
                  <RiBillLine className={Styles.svg} />
                </i>
                <div className={Styles.title}>Bill</div>
              </div>
            </Link>
          </div>
        </div>
        <div className={Styles.part}>
          <div className={Styles.part__title}>
            <div className={Styles.text}>Authorization</div>
          </div>
          <Link
            to="/admin/user"
            onClick={() => {
              setSelected("user");
            }}
          >
            <div
              className={clsx(
                Styles.item,
                selected === "user" ? Styles.active : null
              )}
            >
              <i className={Styles.icon}>
                <MdOutlineManageAccounts className={Styles.svg} />
              </i>
              <div className={Styles.title}>User</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
