import clsx from "clsx";
import React, {useContext, useState} from "react";

import BookingModal from './Styles/BookingModal.module.scss'
import {OptionContext} from "../../../contexts/OptionContext";
import {BookingContext} from "../../../contexts/BookingContext";
import {AuthContext} from "../../../contexts/AuthContext";

import {MdDangerous} from "react-icons/md";
import {SeatContext} from "../../../contexts/SeatContext";
import {CustomerContext} from "../../../contexts/CustomerContext";

function BookModal({ result, tripType }) {
    const {
        optionState: {theme}
    } = useContext(OptionContext)
    const {
        bookingState: { bookings, bookingsLoading},
        setShowBookingForm,
        getBookings,
        addBooking,
        updateBooking
    } = useContext(BookingContext)
    const {
        authState: { user }
    } = useContext(AuthContext)
    const {
        seatState: { seats, seatsLoading },
        getSeats,
    } = useContext(SeatContext)
    const {
        addCustomer
    } = useContext(CustomerContext)

    const [ bookingState, setBookingState] = useState({});
    const [ seatState, setSeatState ] = useState({})


    const handleCloseBooking = () => {

    }

    const handleCloseForm = () => {
        handleCloseBooking()
        setShowBookingForm(false)
    }

    return (
        <div className={clsx(BookingModal.outForm, BookingModal[theme])}>
            <div className={BookingModal.container}>
                <i className={BookingModal.iconClose} onClick={handleCloseForm}>
                    <MdDangerous className={BookingModal.svg}/>
                </i>

                <div className={BookingModal.bookingBar}>

                </div>
            </div>
        </div>
    );
}

export default BookModal;

