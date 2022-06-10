import React from "react";

import AirlineContextProvider from "../contexts/AirlineContext";
import AirportContextProvider from "../contexts/AirportContext";
import RouterContextProvider from "../contexts/RouterContext";

import AuthContextProvider from "../contexts/AuthContext";
import OptionContextProvider from "../contexts/OptionContext";
import SeatTypeContextProvider from "../contexts/SeatTypeContext";
import SeatContextProvider from "../contexts/SeatContext";
import PlaneContextProvider from "../contexts/PlaneContext";
import FlightContextProvider from "../contexts/FlightContext";
import UserContextProvider from "../contexts/UserContext";
import CustomerContextProvider from "../contexts/CustomerContext";
import BillContextProvider from "../contexts/BillContext";
import BookingContextProvider from "../contexts/BookingContext";
import TicketContextProvider from "../contexts/TicketContext";

function Provider({ children }) {
    return (
        <AuthContextProvider>
            <OptionContextProvider>
                <AirlineContextProvider>
                    <AirportContextProvider>
                        <RouterContextProvider>
                            <SeatTypeContextProvider>
                                <SeatContextProvider>
                                    <PlaneContextProvider>
                                        <FlightContextProvider>
                                            <UserContextProvider>
                                                <CustomerContextProvider>
                                                    <BillContextProvider>
                                                        <BookingContextProvider>
                                                            <TicketContextProvider>
                                                                {children}
                                                            </TicketContextProvider>
                                                        </BookingContextProvider>
                                                    </BillContextProvider>
                                                </CustomerContextProvider>
                                            </UserContextProvider>
                                        </FlightContextProvider>
                                    </PlaneContextProvider>
                                </SeatContextProvider>
                            </SeatTypeContextProvider>
                        </RouterContextProvider>
                    </AirportContextProvider>
                </AirlineContextProvider>
            </OptionContextProvider>
        </AuthContextProvider>
    );
}

export default Provider;
