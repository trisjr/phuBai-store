import clsx from "clsx";
import React, { useContext, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";

import BookingModal from "./Styles/BookingModal.module.scss";
import { OptionContext } from "../../../contexts/OptionContext";
import { BookingContext } from "../../../contexts/BookingContext";
import { SeatContext } from "../../../contexts/SeatContext";
import { CustomerContext } from "../../../contexts/CustomerContext";
import { AuthContext } from "../../../contexts/AuthContext";

import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

import { TiTick } from "react-icons/ti";
import { MdDangerous } from "react-icons/md";

function BookModal({ result, tripType }) {
  const {
    optionState: { theme },
  } = useContext(OptionContext);
  const {
    bookingState: { bookings, bookingsLoading },
    setShowBookingForm,
    getBookings,
    addBooking,
    updateBooking,
  } = useContext(BookingContext);
  const [bookingState, setBooking] = useState({});
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { addCustomer } = useContext(CustomerContext);
  const {
    seatState: { seats, seatsLoading },
    getSeats,
  } = useContext(SeatContext);
  const [seat, setSeat] = useState({});
  const handleSetSeat = (name, value) => {
    setSeat({
      ...seat,
      [name]: value,
    });
  };
  const [flight, setFlight] = useState("startFlight");
  const [stepList, setStepList] = useState([
    {
      title: "Choose seat",
      status: false,
    },
    {
      title: "Fill information",
      status: false,
    },
    {
      title: "Payment",
      status: false,
    },
    {
      title: "Done",
      status: false,
    },
  ]);
  const [step, setStep] = useState(0);

  const chooseStep = (id) => {
    if (id === 0 || stepList[id - 1].status === true) {
      setStep(id);
    }
  };

  const nextStep = () => {
    let rs = stepList.filter((item, index) => {
      if (index === step) {
        item.status = true;
      }
      return item;
    });
    setStep(step + 1);
    setStepList(rs);
  };

  const getSeatForPlane = (seatTypeCode, flight) => {
    return seats.filter((item) => {
      if (
        item.plane?.code === flight.plane?.code &&
        item.seatType?.code === seatTypeCode
      ) {
        item.status = checkSeat(item);
        return item;
      } else return null;
    });
  };

  const handleClickSeat = (value) => {
    if (!value.status) {
      handleSetSeat(flight, value);
    }
  };

  const getBookingForFlight = (flight) => {
    return bookings.filter(function (item) {
      if (item.flight?.code === flight.code) {
        return item;
      } else return null;
    });
  };
  const checkSeat = (seat) => {
    let list = getBookingForFlight(result[flight]);
    for (let i = 0; i < list.length; i++) {
      if (list[i].seat?._id === seat._id && list[i].status !== "FAILED") {
        return true;
      }
    }
    return false;
  };

  const checkChooseSeatValid = () => {
    if (tripType === "round-trip") {
      return seat.startFlight && seat.returnFlight;
    } else {
      return seat.startFlight;
    }
  };

  useGetData(() => {
    getBookings();
    getSeats();
  });

  const customerState = {
    cccd: "",
    fullName: "",
    birthday: "",
    phone: "",
    email: "",
  };
  const [customerForm, setCustomerForm] = useState(customerState);
  const { cccd, fullName, birthday, phone, email } = customerForm;

  const onChangeCustomerForm = (e) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value,
    });
  };

  const checkInformation = () => {
    return !(
      cccd === "" ||
      fullName === "" ||
      birthday === "" ||
      phone === "" ||
      email === ""
    );
  };

  const handleCreateBooking = async (customer, flightName) => {
    let { success, booking } = await addBooking({
      flight: result[flightName],
      seat: seat[flightName],
      user: user,
      customer: customer,
      status: "FENDING",
    });
    if (success) {
      return booking;
    }
  };

  const handleBookingTicket = async () => {
    if (checkInformation()) {
      let { success, customer } = await addCustomer(customerForm);
      if (success) {
        let startFlight = await handleCreateBooking(customer, "startFlight");
        let returnFlight;
        if (tripType === "round-trip") {
          returnFlight = await handleCreateBooking(customer, "returnFlight");
        }
        if (startFlight) {
          if (returnFlight) {
            setBooking({
              startFlight,
              returnFlight,
            });
          } else {
            setBooking({
              startFlight,
            });
          }
        }
        nextStep();
      }
    }
  };

  const handleFailedBooking = async (flightName) => {
    if (bookingState[flightName]) {
      let { success } = await updateBooking(bookingState[flightName]?._id, {
        ...bookingState[flightName],
        status: "FAILED",
      });
      if (success) {
        setBooking({
          ...bookingState,
          [flightName]: null,
        });
      }
    }
  };

  const convertDate = (date) => {
    let result = new Date(date);
    return `${result.getUTCDate()} - ${
      result.getUTCMonth() + 1
    } - ${result.getUTCFullYear()}`;
  };

  const handleCloseForm = async () => {
    await handleFailedBooking("startFlight");
    if (tripType === "round-trip") {
      await handleFailedBooking("returnFlight");
    }
    setShowBookingForm(false);
  };

  let fillInformation = (
    <div className={clsx(BookingModal.fillInformation, BookingModal[theme])}>
      <div className={BookingModal.fillTraveler}>
        <div className={BookingModal.title}>Fill Traveler</div>
        <div className="row">
          <div className="col span_1_of_2">
            <label className={BookingModal.label} htmlFor="cccd">
              CCCD
            </label>
            <Input
              type="text"
              value={cccd}
              name="cccd"
              placeholder="Enter your cccd..."
              rule="required"
              onChange={onChangeCustomerForm}
            />
          </div>
          <div className="col span_1_of_2">
            <label className={BookingModal.label} htmlFor="birthday">
              Birthday
            </label>
            <Input
              type="date"
              value={birthday}
              name="birthday"
              rule="required"
              onChange={onChangeCustomerForm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col span_1_of_2">
            <label className={BookingModal.label} htmlFor="fullName">
              Full Name
            </label>
            <Input
              type="text"
              value={fullName}
              name="fullName"
              placeholder="Enter your Full Name..."
              rule="required"
              onChange={onChangeCustomerForm}
            />
          </div>
        </div>
      </div>
      <div className={BookingModal.fillContact}>
        <div className={BookingModal.title}>Fill Contact</div>
        <div className="row">
          <div className="col span_1_of_2">
            <label className={BookingModal.label} htmlFor="phone">
              Phone
            </label>
            <Input
              type="text"
              value={phone}
              name="phone"
              placeholder="Enter your phone..."
              rule="required"
              onChange={onChangeCustomerForm}
            />
          </div>
          <div className="col span_1_of_2">
            <label className={BookingModal.label} htmlFor="email">
              Email
            </label>
            <Input
              type="text"
              value={email}
              name="email"
              placeholder="Enter your email..."
              onChange={onChangeCustomerForm}
            />
          </div>
        </div>
      </div>
      <div className={BookingModal.action}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingTicket}
        >
          Done
        </Button>
      </div>
    </div>
  );

  const randomQrCode = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const [qrCode, setQrCode] = useState({
    code: randomQrCode(6),
    value: "",
  });
  const handleSetQrCode = (e) => {
    setQrCode({
      ...qrCode,
      value: e.target.value,
    });
  };
  const checkQrCode = () => {
    return qrCode.value === qrCode.code;
  };

  const handleCompleted = async (flightName) => {
    let { success } = await updateBooking(bookingState[flightName]?._id, {
      ...bookingState[flightName],
      status: "COMPLETED",
    });
    if (success) {
      setBooking({
        ...bookingState,
        [flightName]: null,
      });
    }
  };

  const handleBookingSuccessfully = async () => {
    if (checkQrCode()) {
      await handleCompleted("startFlight");
      if (tripType === "round-trip") {
        await handleCompleted("returnFlight");
      }
      nextStep();
    }
  };

  let payment;
  payment = (
    <div className={clsx(BookingModal.payment, BookingModal[theme])}>
      <div className={BookingModal.title}>Payment</div>
      <div className={BookingModal.wrapper}>
        <div className={BookingModal.desc}>Scan QR code to pay...</div>
        <div className={BookingModal.qrCode}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCode.code}&amp;size=100x100`}
            alt=""
            title="QrCode"
          />
        </div>
        <div className={BookingModal.fill}>
          <label htmlFor="code">Code</label>
          <Input
            type="text"
            value={qrCode.value}
            name="code"
            onChange={handleSetQrCode}
          />
        </div>
      </div>
      <div className={BookingModal.action}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingSuccessfully}
        >
          Done
        </Button>
      </div>
    </div>
  );

  let chooseSeat;
  if (seatsLoading && bookingsLoading) {
    chooseSeat = <Loading />;
  } else {
    chooseSeat = (
      <div className={clsx(BookingModal.chooseSeat, BookingModal[theme])}>
        <div className={BookingModal.seatInfo}>
          <div
            className={clsx(
              BookingModal.seatItem,
              flight === "startFlight" ? BookingModal.active : null
            )}
            onClick={() => {
              setFlight("startFlight");
            }}
          >
            <div className={BookingModal.title}>Start Seat</div>
            <div className={BookingModal.code}>{`Code : ${
              seat.startFlight?.code ? seat.startFlight?.code : "..."
            }`}</div>
            <div className={BookingModal.type}>{`Type : ${
              seat.startFlight?.seatType.name
                ? seat.startFlight?.seatType.name
                : "..."
            }`}</div>
            <div className={BookingModal.price}>{`Price : ${
              seat.startFlight?.seatType.price
                ? seat.startFlight?.seatType.price
                : "..."
            }`}</div>
          </div>
          {tripType === "round-trip" ? (
            <div
              className={clsx(
                BookingModal.seatItem,
                flight === "returnFlight" ? BookingModal.active : null
              )}
              onClick={() => {
                setFlight("returnFlight");
              }}
            >
              <div className={BookingModal.title}>Return Seat</div>
              <div className={BookingModal.code}>{`Code : ${
                seat.returnFlight?.code ? seat.returnFlight?.code : "..."
              }`}</div>
              <div className={BookingModal.type}>{`Type : ${
                seat.returnFlight?.seatType.name
                  ? seat.returnFlight?.seatType.name
                  : "..."
              }`}</div>
              <div className={BookingModal.price}>{`Price : ${
                seat.returnFlight?.seatType.price
                  ? seat.returnFlight?.seatType.price
                  : "..."
              }`}</div>
            </div>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (checkChooseSeatValid()) {
                nextStep();
              }
            }}
          >
            Done
          </Button>
        </div>
        <div className={BookingModal.seatWrapper}>
          <div className={BookingModal.title}>
            {flight === "startFlight" ? "Start Flight" : "Return Flight"}
          </div>
          <div className={BookingModal.firstClass}>
            {getSeatForPlane("first-class", result[flight]).map(
              (item, index) => (
                <div
                  key={index}
                  className={clsx(
                    BookingModal.seat,
                    item.code === seat[flight]?.code
                      ? BookingModal.active
                      : null,
                    item.status ? BookingModal.disable : null
                  )}
                  onClick={() => {
                    handleClickSeat(item);
                  }}
                >
                  {item.code}
                </div>
              )
            )}
          </div>
          <div className="row">
            <div className="col span_1_of_2">
              {getSeatForPlane("business", result[flight]).map((item, index) =>
                index % 2 === 0 ? (
                  <div
                    key={index}
                    className={clsx(
                      BookingModal.seat,
                      item.code === seat[flight]?.code
                        ? BookingModal.active
                        : null,
                      item.status ? BookingModal.disable : null
                    )}
                    onClick={() => {
                      handleClickSeat(item);
                    }}
                  >
                    {item.code}
                  </div>
                ) : null
              )}
            </div>
            <div className="col span_1_of_2">
              {getSeatForPlane("business", result[flight]).map((item, index) =>
                index % 2 === 1 ? (
                  <div
                    key={index}
                    className={clsx(
                      BookingModal.seat,
                      item.code === seat[flight]?.code
                        ? BookingModal.active
                        : null,
                      item.status ? BookingModal.disable : null
                    )}
                    onClick={() => {
                      handleClickSeat(item);
                    }}
                  >
                    {item.code}
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div className="row">
            <div className="col span_1_of_3">
              {getSeatForPlane("premium-economy", result[flight]).map(
                (item, index) =>
                  index % 3 === 0 ? (
                    <div
                      key={index}
                      className={clsx(
                        BookingModal.seat,
                        item.code === seat[flight]?.code
                          ? BookingModal.active
                          : null,
                        item.status ? BookingModal.disable : null
                      )}
                      onClick={() => {
                        handleClickSeat(item);
                      }}
                    >
                      {item.code}
                    </div>
                  ) : null
              )}
            </div>
            <div className="col span_1_of_3">
              {getSeatForPlane("premium-economy", result[flight]).map(
                (item, index) =>
                  index % 3 === 2 ? (
                    <div
                      key={index}
                      className={clsx(
                        BookingModal.seat,
                        item.code === seat[flight]?.code
                          ? BookingModal.active
                          : null,
                        item.status ? BookingModal.disable : null
                      )}
                      onClick={() => {
                        handleClickSeat(item);
                      }}
                    >
                      {item.code}
                    </div>
                  ) : null
              )}
            </div>
            <div className="col span_1_of_3">
              {getSeatForPlane("premium-economy", result[flight]).map(
                (item, index) =>
                  index % 3 === 1 ? (
                    <div
                      key={index}
                      className={clsx(
                        BookingModal.seat,
                        item.code === seat[flight]?.code
                          ? BookingModal.active
                          : null,
                        item.status ? BookingModal.disable : null
                      )}
                      onClick={() => {
                        handleClickSeat(item);
                      }}
                    >
                      {item.code}
                    </div>
                  ) : null
              )}
            </div>
          </div>
          <div className="row">
            <div className="col span_1_of_3">
              {getSeatForPlane("economy", result[flight]).map((item, index) =>
                index % 3 === 0 ? (
                  <div
                    key={index}
                    className={clsx(
                      BookingModal.seat,
                      item.code === seat[flight]?.code
                        ? BookingModal.active
                        : null,
                      item.status ? BookingModal.disable : null
                    )}
                    onClick={() => {
                      handleClickSeat(item);
                    }}
                  >
                    {item.code}
                  </div>
                ) : null
              )}
            </div>
            <div className="col span_1_of_3">
              {getSeatForPlane("economy", result[flight]).map((item, index) =>
                index % 3 === 2 ? (
                  <div
                    key={index}
                    className={clsx(
                      BookingModal.seat,
                      item.code === seat[flight]?.code
                        ? BookingModal.active
                        : null,
                      item.status ? BookingModal.disable : null
                    )}
                    onClick={() => {
                      handleClickSeat(item);
                    }}
                  >
                    {item.code}
                  </div>
                ) : null
              )}
            </div>
            <div className="col span_1_of_3">
              {getSeatForPlane("economy", result[flight]).map((item, index) =>
                index % 3 === 1 ? (
                  <div
                    key={index}
                    className={clsx(
                      BookingModal.seat,
                      item.code === seat[flight]?.code
                        ? BookingModal.active
                        : null,
                      item.status ? BookingModal.disable : null
                    )}
                    onClick={() => {
                      handleClickSeat(item);
                    }}
                  >
                    {item.code}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  let show = (
    <div className={clsx(BookingModal["show"])}>
      <div className={BookingModal["title"]}>Bill</div>
      <div className={BookingModal["content"]}>
        <ul className={BookingModal["info"]}>
          <li
            className={clsx(BookingModal["info_item"], BookingModal["company"])}
          >
            PhuBai Store
          </li>
          <li className={BookingModal["info_item"]}>113 Legend</li>
          <li className={BookingModal["info_item"]}>Moon</li>
          <li className={BookingModal["info_item"]}>The Solar System</li>
          <li className={BookingModal["info_item"]}>Tax code: *********</li>
          <li className={BookingModal["info_item"]}>Hotline: **********</li>
        </ul>
        <div className={BookingModal["details"]}>
          <div className={BookingModal["contact"]}>
            <div className={BookingModal["detail_title"]}>
              1. Contact details
            </div>
            <ul>
              <li className={BookingModal["item"]}>{`Name: ${fullName}`}</li>
              <li
                className={BookingModal["item"]}
              >{`Birthday: ${birthday}`}</li>
              <li className={BookingModal["item"]}>{`CCCD: ${cccd}`}</li>
              <li className={BookingModal["item"]}>{`Phone: ${phone}`}</li>
            </ul>
          </div>
          <div className={BookingModal["flightDetails"]}>
            <div className={BookingModal["detail_title"]}>
              2. Flight details
            </div>
            <div className={BookingModal["flight"]}>
              <div
                className={clsx(BookingModal["head"], BookingModal["group"])}
              >
                <div
                  className={clsx(
                    BookingModal["span_1_of_4"],
                    BookingModal["col"]
                  )}
                >
                  Date
                </div>
                <div
                  className={clsx(
                    BookingModal["span_1_of_4"],
                    BookingModal["col"]
                  )}
                >
                  Flight
                </div>
                <div
                  className={clsx(
                    BookingModal["span_1_of_4"],
                    BookingModal["col"]
                  )}
                >
                  From
                </div>
                <div
                  className={clsx(
                    BookingModal["span_1_of_4"],
                    BookingModal["col"]
                  )}
                >
                  To
                </div>
              </div>
              {result.startFlight && (
                <div className={BookingModal["group"]}>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {convertDate(result.startFlight?.start)}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.startFlight?.code}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.startFlight?.router?.from?.code}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.startFlight?.router?.to?.code}
                  </div>
                </div>
              )}
              {result.returnFlight && (
                <div className={BookingModal["group"]}>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {convertDate(result.returnFlight?.start)}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.returnFlight?.code}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.returnFlight?.router?.from?.code}
                  </div>
                  <div
                    className={clsx(
                      BookingModal["span_1_of_4"],
                      BookingModal["col"]
                    )}
                  >
                    {result.returnFlight?.router?.to?.code}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={BookingModal["bill"]}>
            <div className={BookingModal["detail_title"]}>3. Bill</div>
            <div className={BookingModal["billTotal"]}>{`Total: ${
              result.startFlight?.price +
              (result.returnFlight?.price || 0) +
              seat.startFlight?.seatType?.price +
              (seat.returnFlight?.seatType?.price || 0)
            }$`}</div>
          </div>
        </div>
        <div className={BookingModal["action"]}>
          <Button
            onClick={() => {
              setShowBookingForm(false);
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={clsx(BookingModal.outForm, BookingModal[theme])}>
      <div className={BookingModal.container}>
        <i className={BookingModal.iconClose} onClick={handleCloseForm}>
          <MdDangerous className={BookingModal.svg} />
        </i>
        <div className={BookingModal.bookingBar}>
          <div className={BookingModal.header}>Book Ticket</div>
          <div className={BookingModal.bar}>
            {stepList.map((item, index) => (
              <div
                className={clsx(
                  BookingModal.bookingBar__item,
                  step === index ? BookingModal.select : null
                )}
                key={index}
                onClick={() => {
                  chooseStep(index);
                }}
              >
                <div className={BookingModal.head}>
                  <div className={BookModal.title}>{item.title}</div>
                  {item.status ? (
                    <i className={BookingModal.icon}>
                      <TiTick className={BookingModal.svg} />
                    </i>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={BookingModal.bookingBody}>
          {step === 0 && chooseSeat}
          {step === 1 && fillInformation}
          {step === 2 && payment}
          {step === 3 && show}
        </div>
      </div>
    </div>
  );
}

export default BookModal;
