import clsx from "clsx";
import React, { useContext, useRef, useState } from "react";
import { useTitle } from "../../../hooks/useTitle";
import { useGetData } from "../../../hooks/useGetData";
import { useFindInArray } from "../../../hooks/useFindInArray";
import { useSort } from "../../../hooks/useSort";

import { PlaneContext } from "../../../contexts/PlaneContext";
import { SeatTypeContext } from "../../../contexts/SeatTypeContext";
import { OptionContext } from "../../../contexts/OptionContext";
import { SeatContext } from "../../../contexts/SeatContext";
import { AirlineContext } from "../../../contexts/AirlineContext";
import Loading from "../../../components/common/Loading/Loading";
import EmptyPage from "../../../components/common/EmptyPage/EmptyPage";
import Button from "../../../components/common/Button/Button";
import Chip from "../../../components/common/Chip/Chip";
import Styles from "./Styles/Styles.module.scss";
import PageStyles from "../../Styles/PageStyles.module.scss";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

import { BiSearchAlt } from "react-icons/bi";
import { MdCancel, MdDeleteForever, MdOutlineAdd } from "react-icons/md";
import {
    IoCaretBackOutline,
    IoCaretDown,
    IoCaretForwardOutline,
    IoCaretUp,
} from "react-icons/io5";

function Plane() {
    useTitle("Plane");
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        airlineState: { airlines },
        getAirlines,
    } = useContext(AirlineContext);
    const {
        seatState: { seats },
        getSeats,
        deleteSeat,
    } = useContext(SeatContext);
    const {
        seatTypeState: { seatTypes },
        getSeatTypes,
    } = useContext(SeatTypeContext);

    const {
        planeState: { planes, planesLoading },
        getPlanes,
        deletePlane,
        setShowAddForm,
        showAddForm,
        setShowUpdateForm,
        showUpdateForm,
    } = useContext(PlaneContext);

    const ref = useRef();
    const [select, setSelect] = useState("");
    const [findState, setFindState, find] = useFindInArray("");
    const [sortState, setSort, sort] = useSort("code");

    const handleSetSort = (value) => {
        setPageActive(0);
        setSort(value);
    };
    const handleSort = () => {
        return sort(handleFind());
    };
    const handleFind = () => {
        return find(planes, findState);
    };
    const handleChangeFindValue = (value) => {
        setPageActive(0);
        setFindState(value);
    };
    const [pageActive, setPageActive] = useState(0);
    let page = Math.round((handleFind().length - 1) / 10 - 0.5);

    const handleDelete = (e, item) => {
        e.stopPropagation();
        for (let index = 0; index < seats.length; index++) {
            if (seats[index].plane._id === item._id) {
                deleteSeat(seats[index]._id);
            }
        }
        deletePlane(item._id);
    };

    useGetData(() => {
        getPlanes();
        getAirlines();
        getSeatTypes();
        getSeats();
    });

    let body;
    if (planesLoading) {
        body = <Loading />;
    } else {
        if (planes.length === 0) {
            body = <EmptyPage />;
        } else {
            body = (
                <div className={PageStyles.data}>
                    <div className={PageStyles.header}>
                        <div className={PageStyles.search}>
                            <i
                                className={clsx(
                                    PageStyles.icon,
                                    PageStyles.search__icon
                                )}
                                onClick={() => ref.current?.focus()}
                            >
                                <BiSearchAlt className={PageStyles.svg} />
                            </i>
                            <input
                                className={PageStyles.search}
                                ref={ref}
                                type="text"
                                placeholder="Enter text..."
                                value={findState}
                                onChange={(e) => {
                                    handleChangeFindValue(e.target.value);
                                }}
                            />
                            <i
                                className={clsx(
                                    PageStyles.icon,
                                    PageStyles.clear__icon,
                                    findState.length > 0
                                        ? null
                                        : PageStyles.hide
                                )}
                                onClick={() => {
                                    handleChangeFindValue("");
                                    ref.current?.focus();
                                }}
                            >
                                <MdCancel className={PageStyles.svg} />
                            </i>
                        </div>
                    </div>
                    <div className={PageStyles.body}>
                        <div className={PageStyles.table}>
                            <div className={PageStyles.table__head}>
                                <div className={Styles.index}>STT</div>
                                <div
                                    className={Styles.code}
                                    onClick={(event) => {
                                        handleSetSort("code");
                                        event.preventDefault();
                                    }}
                                >
                                    <div className={Styles.text}>Code</div>
                                    <i className={PageStyles.icon}>
                                        {sortState.value === "code" ? (
                                            sortState.type === "asc" ? (
                                                <IoCaretDown
                                                    className={PageStyles.svg}
                                                />
                                            ) : (
                                                <IoCaretUp
                                                    className={PageStyles.svg}
                                                />
                                            )
                                        ) : null}
                                    </i>
                                </div>
                                <div
                                    className={Styles.airline}
                                    onClick={() =>
                                        handleSetSort("airline/code")
                                    }
                                >
                                    <div className={Styles.text}>Airline</div>
                                    <i className={PageStyles.icon}>
                                        {sortState.value === "airline/code" ? (
                                            sortState.type === "asc" ? (
                                                <IoCaretDown
                                                    className={PageStyles.svg}
                                                />
                                            ) : (
                                                <IoCaretUp
                                                    className={PageStyles.svg}
                                                />
                                            )
                                        ) : null}
                                    </i>
                                </div>
                                <div className={Styles.status}>
                                    <div className={Styles.text}>Status</div>
                                </div>
                            </div>
                            <div className={PageStyles.table__body}>
                                {handleSort().map(function (item, index) {
                                    if (
                                        index >= pageActive * 10 &&
                                        index < (pageActive + 1) * 10
                                    ) {
                                        return (
                                            <div
                                                key={item.code}
                                                className={clsx(
                                                    PageStyles.item,
                                                    index % 2 === 1
                                                        ? PageStyles.dark
                                                        : null
                                                )}
                                                onClick={() => {
                                                    setSelect(item._id);
                                                    setShowUpdateForm(true);
                                                }}
                                            >
                                                <div
                                                    className={
                                                        PageStyles.item__wrapper
                                                    }
                                                >
                                                    <div
                                                        className={Styles.index}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div
                                                        className={Styles.code}
                                                    >
                                                        {item.code}
                                                    </div>
                                                    <div
                                                        className={
                                                            Styles.airline
                                                        }
                                                    >
                                                        {item.airline.name}
                                                    </div>
                                                    <div
                                                        className={
                                                            Styles.status
                                                        }
                                                    >
                                                        <Chip
                                                            variant="contained"
                                                            color={
                                                                item.status
                                                                    ? "success"
                                                                    : "warning"
                                                            }
                                                        >
                                                            {item.status
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </Chip>
                                                    </div>
                                                </div>
                                                <i
                                                    className={clsx(
                                                        PageStyles.icon,
                                                        PageStyles.delete__icon
                                                    )}
                                                    onClick={(e) =>
                                                        handleDelete(e, item)
                                                    }
                                                >
                                                    <MdDeleteForever
                                                        className={
                                                            PageStyles.svg
                                                        }
                                                    />
                                                </i>
                                            </div>
                                        );
                                    } else return null;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={PageStyles.footer}>
                        <div>{`Total: ${handleSort().length} elements.`}</div>
                        <div className={PageStyles.page}>
                            <i
                                className={clsx(
                                    PageStyles.icon,
                                    pageActive === 0
                                        ? PageStyles.disabled
                                        : null
                                )}
                                onClick={() => {
                                    if (pageActive !== 0) {
                                        setPageActive(pageActive - 1);
                                    }
                                }}
                            >
                                <IoCaretBackOutline
                                    className={PageStyles.svg}
                                />
                            </i>
                            <div className={PageStyles.index}>
                                {pageActive + 1}
                            </div>
                            <i
                                className={clsx(
                                    PageStyles.icon,
                                    pageActive === page
                                        ? PageStyles.disabled
                                        : null
                                )}
                                onClick={() => {
                                    if (pageActive !== page) {
                                        setPageActive(pageActive + 1);
                                    }
                                }}
                            >
                                <IoCaretForwardOutline
                                    className={PageStyles.svg}
                                />
                            </i>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={clsx(PageStyles.content, PageStyles[theme])}>
            <div className={PageStyles.title}>Plane</div>
            {body}
            <div className={PageStyles.action}>
                <Button
                    styles="icon"
                    color={theme}
                    startIcon={<MdOutlineAdd className={PageStyles.svg} />}
                    onClick={() => {
                        setShowAddForm(true);
                    }}
                />
            </div>
            {showAddForm ? (
                <AddModal
                    airlines={airlines}
                    planes={planes}
                    seatTypes={seatTypes}
                />
            ) : null}
            {showUpdateForm ? (
                <UpdateModal airlines={airlines} planes={planes} _id={select} />
            ) : null}
        </div>
    );
}

export default Plane;
