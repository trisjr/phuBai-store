import React from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";

import GlobalStyles from "./components/common/GlobalStyles/GlobalStyles";
import Auth from "./components/layouts/Auth";
import Landing from "./components/layouts/Landing";
import Provider from "./Provider/Provider";
import Protected from "./components/layouts/Protected";
import Airline from "./views/Admin/Airline/Airline";
import Airport from "./views/Admin/Airport/Airport";
import Bill from "./views/Admin/Bill/Bill";
import Booking from "./views/Admin/Booking/Booking";
import Customer from "./views/Admin/Customer/Customer";
import Flight from "./views/Admin/Flight/Flight";
import Plane from "./views/Admin/Plane/Plane";
import Router from "./views/Admin/Router/Router";
import Seat from "./views/Admin/Seat/Seat";
import SeatType from "./views/Admin/SeatType/SeatType";
import Ticket from "./views/Admin/Ticket/Ticket";
import User from "./views/Admin/User/User";
import Dashboard from "./views/Admin/Dashboard/Dashboard";
import Header from "./components/common/Header/Header";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Home from "./views/User/Home/Home";
import Book from "./views/User/Book/Book";

function App() {
    return (
        <GlobalStyles>
            <Provider>
                <Routers>
                    <Header />
                    <div className="wrapper">
                        <Sidebar />
                        <div className="container">
                            <Routes>
                                <Route
                                    exact
                                    path="/login"
                                    element={<Auth authRoute="login" />}
                                />
                                <Route
                                    exact
                                    path="/register"
                                    element={<Auth authRoute="register" />}
                                />
                                <Route
                                    exact
                                    path="/admin/airline"
                                    element={
                                        <Protected element={<Airline />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/airport"
                                    element={
                                        <Protected element={<Airport />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/bill"
                                    element={<Protected element={<Bill />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/booking"
                                    element={
                                        <Protected element={<Booking />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/customer"
                                    element={
                                        <Protected element={<Customer />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/flight"
                                    element={<Protected element={<Flight />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/plane"
                                    element={<Protected element={<Plane />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/router"
                                    element={<Protected element={<Router />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/seat"
                                    element={<Protected element={<Seat />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/seatType"
                                    element={
                                        <Protected element={<SeatType />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/ticket"
                                    element={<Protected element={<Ticket />} />}
                                />
                                <Route
                                    exact
                                    path="/admin/User"
                                    element={<Protected element={<User />} />}
                                />
                                <Route
                                    exact
                                    path="/admin"
                                    element={
                                        <Protected element={<Dashboard />} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/home"
                                    element={<Protected element={<Home />} />}
                                />
                                <Route
                                    exact
                                    path="/book"
                                    element={<Protected element={<Book />} />}
                                />

                                <Route path="/*" element={<Landing />} />
                            </Routes>
                        </div>
                    </div>
                </Routers>
            </Provider>
        </GlobalStyles>
    );
}

export default App;
