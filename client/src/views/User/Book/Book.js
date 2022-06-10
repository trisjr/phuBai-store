import clsx from "clsx";
import React, { useContext, useState } from "react";
import { useTitle } from "../../../hooks/useTitle";

import Styles from "./Styles.module.scss";
import { useGetData } from "../../../hooks/useGetData";
import { AirportContext } from "../../../contexts/AirportContext";
import { FlightContext } from "../../../contexts/FlightContext";
import { OptionContext } from "../../../contexts/OptionContext";
import { BookingContext } from "../../../contexts/BookingContext";
import EmptyPage from "../../../components/common/EmptyPage/EmptyPage";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";
import BookModal from "./BookModal";

import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { BsAlignEnd, BsAlignStart, BsPeopleFill } from "react-icons/bs";
import DatePicker from "../../../components/lib/DatePicker/DatePicker";
import Select from "../../../components/lib/Select/Select";
import ToggleButton, {
  ToggleButtonItem,
} from "../../../components/lib/ToggleButton/ToggleButton";

function Book() {
  useTitle("Book Ticket");
  const {
    optionState: { theme },
  } = useContext(OptionContext);
  const { showBookingForm, setShowBookingForm } = useContext(BookingContext);
  const {
    airportState: { airports, airportsLoading },
    getAirports,
  } = useContext(AirportContext);
  const {
    flightState: { flights },
    getFlights,
  } = useContext(FlightContext);

  const initForm = {
    tripType: "one-way",
    from: "",
    to: "",
    passenger: "adult",
    startDate: "",
    returnDate: "",
  };
  const [searchForm, setSearchForm] = useState(initForm);
  const { tripType, from, to, passenger, startDate, returnDate } = searchForm;
  const [list, setList] = useState({
    startFlight: [],
    returnFlight: [],
  });

  const [result, setResult] = useState({});
  const [step, setStep] = useState("startFlight");

  const onCheck = (e) => {
    setStep("startFlight");
    setSearchForm({
      ...searchForm,
      tripType: e.target.value,
    });
  };

  const handleAction = (action, value) => {
    switch (action) {
      case "handleChangeStartDate": {
        setSearchForm({
          ...searchForm,
          startDate: value,
        });
        break;
      }
      case "handleChangeReturnDate": {
        setSearchForm({
          ...searchForm,
          returnDate: value,
        });
        break;
      }
      case "handleChangeFrom": {
        setSearchForm({
          ...searchForm,
          from: value,
        });
        break;
      }
      case "handleChangeTo": {
        setSearchForm({
          ...searchForm,
          to: value,
        });
        break;
      }
      case "handleChangePassenger": {
        setSearchForm({
          ...searchForm,
          passenger: value,
        });
        break;
      }

      default:
        return;
    }
  };

  const startFlightValid = (flight) => {
    if (flight) {
      if (flight.router.from.code !== from.code) {
        return false;
      }
      if (flight.router.to.code !== to.code) {
        return false;
      }
      if (
        new Date(flight.start).getUTCFullYear() !==
        new Date(startDate).getUTCFullYear()
      ) {
        return false;
      }
      if (
        new Date(flight.start).getUTCMonth() !==
        new Date(startDate).getUTCMonth()
      ) {
        return false;
      }
      if (
        new Date(flight.start).getUTCDate() !== new Date(startDate).getUTCDate()
      ) {
        return false;
      }
    }
    return true;
  };

  const returnFlightValid = (flight) => {
    if (flight) {
      if (flight.router.from.code !== to.code) {
        return false;
      }
      if (flight.router.to.code !== from.code) {
        return false;
      }
      if (
        new Date(flight.start).getUTCFullYear() !==
        new Date(returnDate).getUTCFullYear()
      ) {
        return false;
      }
      if (
        new Date(flight.start).getUTCMonth() !==
        new Date(returnDate).getUTCMonth()
      ) {
        return false;
      }
      if (
        new Date(flight.start).getUTCDate() !==
        new Date(returnDate).getUTCDate()
      ) {
        return false;
      }
    }
    return true;
  };

  const handleFindFlight = () => {
    setList({
      startFlight: flights.filter((flight) => startFlightValid(flight)),
      returnFlight: flights.filter((flight) => returnFlightValid(flight)),
    });
  };

  const getResult = () => {
    if (tripType === "one-way") {
      return {
        startFlight: result.startFlight,
      };
    } else {
      return result;
    }
  };

  useGetData(() => {
    getAirports();
    getFlights();
  });

  const getTime = (date) => {
    let hour = new Date(date).getUTCHours();
    let min = new Date(date).getUTCMinutes();

    return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min}`;
  };

  let searchFlight;
  if (airportsLoading) {
    searchFlight = <Loading />;
  } else {
    if (airports.length === 0) {
      searchFlight = <EmptyPage />;
    } else {
      searchFlight = (
        <div className={Styles.findTicket}>
          <div className={Styles.tripType}>
            <div className={Styles.select}>
              <input
                className={Styles.radio}
                type="radio"
                id="one-way"
                name="trip-type"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={onCheck}
              />
              <label className={Styles.label} htmlFor="one-way">
                One-way
              </label>
            </div>
            <div className={Styles.select}>
              <input
                className={Styles.radio}
                type="radio"
                id="round-trip"
                name="trip-type"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={onCheck}
              />
              <label className={Styles.label} htmlFor="round-trip">
                Round-trip
              </label>
            </div>
          </div>
          <div className={Styles.row}>
            <div className={clsx(Styles.col, Styles.span_1_of_3)}>
              <i className={Styles.icon}>
                <FaPlaneDeparture className={Styles.svg} />
              </i>
              <div className={Styles.fill}>
                <Select
                  title={"From"}
                  array={airports.filter((airport) => {
                    airport.value = `${airport.name} (${airport.code})`;
                    return {
                      airport,
                    };
                  })}
                  selected={from}
                  onSelect={(value) => handleAction("handleChangeFrom", value)}
                />
              </div>
            </div>
            <div className={clsx(Styles.col, Styles.span_1_of_3)}>
              <i className={Styles.icon}>
                <FaPlaneArrival className={Styles.svg} />
              </i>
              <div className={Styles.fill}>
                <Select
                  title={"To"}
                  array={airports.filter((airport) => {
                    airport.value = `${airport.name} (${airport.code})`;
                    return {
                      airport,
                    };
                  })}
                  selected={to}
                  onSelect={(value) => handleAction("handleChangeTo", value)}
                />
              </div>
            </div>
            <div className={clsx(Styles.col, Styles.span_1_of_3)}>
              <i className={Styles.icon}>
                <BsPeopleFill className={Styles.svg} />
              </i>
              <ToggleButton color={theme}>
                <ToggleButtonItem
                  value={passenger}
                  onChange={(value) =>
                    handleAction("handleChangePassenger", value)
                  }
                >
                  adult
                </ToggleButtonItem>
                <ToggleButtonItem
                  value={passenger}
                  onChange={(value) =>
                    handleAction("handleChangePassenger", value)
                  }
                >
                  child
                </ToggleButtonItem>
                <ToggleButtonItem
                  value={passenger}
                  onChange={(value) =>
                    handleAction("handleChangePassenger", value)
                  }
                >
                  infant
                </ToggleButtonItem>
              </ToggleButton>
            </div>
          </div>
          <div className={Styles.row}>
            <div className={clsx(Styles.col, Styles.span_1_of_3)}>
              <i className={Styles.icon}>
                <FaRegCalendarAlt className={Styles.svg} />
              </i>
              <div className={Styles.fill}>
                <DatePicker
                  value={startDate}
                  handleChange={(value) =>
                    handleAction("handleChangeStartDate", value)
                  }
                />
              </div>
            </div>
            {tripType === "round-trip" && (
              <div className={clsx(Styles.col, Styles.span_1_of_3)}>
                <i className={Styles.icon}>
                  <FaRegCalendarAlt className={Styles.svg} />
                </i>
                <div className={Styles.fill}>
                  <DatePicker
                    value={returnDate}
                    handleChange={(value) =>
                      handleAction("handleChangeReturnDate", value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className={Styles.action}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFindFlight}
            >
              Search
            </Button>
          </div>
        </div>
      );
    }
  }
  let resultFlight;
  if (list.returnFlight.length === 0 && list.startFlight.length === 0) {
    resultFlight = <></>;
  } else {
    resultFlight = (
      <div className={clsx(Styles.resultFlight, Styles.row)}>
        <div className={clsx(Styles.step, Styles.col, Styles.span_1_of_3)}>
          <div className={Styles.title}>Your Flights</div>
          <div className={Styles.trip}>
            <div
              className={clsx(
                Styles.startTrip,
                step === "startFlight" ? Styles.active : null
              )}
              onClick={() => setStep("startFlight")}
            >
              <div className={Styles.icon}>
                <BsAlignStart className={Styles.svg} />
              </div>
              <div className={Styles.trip__info}>
                <div className={Styles.province}>
                  <div className={Styles.from}>{from.province}</div>
                  <div>-</div>
                  <div className={Styles.to}>{to.province}</div>
                </div>
                <div className={Styles.date}>{startDate}</div>
              </div>
            </div>
            {tripType === "round-trip" ? (
              <div
                className={clsx(
                  Styles.returnTrip,
                  step === "returnFlight" ? Styles.active : null
                )}
                onClick={() => setStep("returnFlight")}
              >
                <div className={Styles.icon}>
                  <BsAlignEnd className={Styles.svg} />
                </div>
                <div className={Styles.trip__info}>
                  <div className={Styles.province}>
                    <div className={Styles.from}>{to.province}</div>
                    <div>-</div>
                    <div className={Styles.to}>{from.province}</div>
                  </div>
                  <div className={Styles.date}>{returnDate}</div>
                </div>
              </div>
            ) : null}
          </div>
          <div className={Styles.action}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setShowBookingForm(true);
              }}
            >
              Done
            </Button>
          </div>
        </div>
        <div className={clsx(Styles.result, Styles.col, Styles.span_2_of_3)}>
          {list[step].length === 0
            ? "None"
            : list[step].map((item, index) => (
                <div
                  className={clsx(
                    Styles.item,
                    result[step]?._id === item._id ? Styles.active : null
                  )}
                  key={index}
                  onClick={() =>
                    setResult({
                      ...result,
                      [step]: item,
                    })
                  }
                >
                  <div className={Styles.airline}>
                    <img
                      className={Styles.logo}
                      src={item.plane?.airline.logo}
                      alt="logo"
                    />
                  </div>
                  <div className={Styles.from}>
                    <div className={Styles.province}>
                      {item.router?.from.code}
                    </div>
                    <div className={Styles.time}>{getTime(item.start)}</div>
                  </div>
                  <div className={Styles.to}>
                    <div className={Styles.province}>
                      {item.router?.to.code}
                    </div>
                    <div className={Styles.time}>{getTime(item.end)}</div>
                  </div>
                  <div className={Styles.price}>{`${item.price + 100} ~ ${
                    item.price + 400
                  }`}</div>
                </div>
              ))}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(Styles.bookTicket, Styles[theme])}>
      {searchFlight}
      {resultFlight}
      {showBookingForm ? (
        <BookModal result={getResult()} tripType={tripType} />
      ) : null}
    </div>
  );
}

export default Book;
