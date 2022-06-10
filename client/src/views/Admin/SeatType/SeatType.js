import clsx from "clsx";
import React, { useContext, useRef, useState } from "react";
import { useTitle } from "../../../hooks/useTitle";
import { useGetData } from "../../../hooks/useGetData";
import { useSort } from "../../../hooks/useSort";
import { useFindInArray } from "../../../hooks/useFindInArray";

import Styles from "./Styles/Styles.module.scss";
import PageStyles from "../../Styles/PageStyles.module.scss";
import { OptionContext } from "../../../contexts/OptionContext";
import { SeatTypeContext } from "../../../contexts/SeatTypeContext";
import Loading from "../../../components/common/Loading/Loading";
import EmptyPage from "../../../components/common/EmptyPage/EmptyPage";
import Button from "../../../components/common/Button/Button";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

import { MdCancel, MdDeleteForever, MdOutlineAdd } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import {
    IoCaretBackOutline,
    IoCaretDown,
    IoCaretForwardOutline,
    IoCaretUp,
} from "react-icons/io5";

function SeatType() {
    useTitle("SeatType");
    const {
        optionState: { theme },
    } = useContext(OptionContext);
    const {
        seatTypeState: { seatTypes, seatTypesLoading },
        getSeatTypes,
        deleteSeatType,
        setShowAddForm,
        showAddForm,
        setShowUpdateForm,
        showUpdateForm,
    } = useContext(SeatTypeContext);
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
        return find(seatTypes, findState);
    };
    const handleChangeFindValue = (value) => {
        setPageActive(0);
        setFindState(value);
    };
    const [pageActive, setPageActive] = useState(0);
    let page = Math.round((handleFind().length - 1) / 10 - 0.5);

    const handleDelete = (e, _id) => {
        e.stopPropagation();
        deleteSeatType(_id);
    };

    useGetData(() => {
        getSeatTypes();
    });

    let body;
    if (seatTypesLoading) {
        body = <Loading />;
    } else {
        if (seatTypes.length === 0) {
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
                                    onClick={() => {
                                        handleSetSort("code");
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
                                    className={Styles.name}
                                    onClick={() => handleSetSort("name")}
                                >
                                    <div className={Styles.text}>Name</div>
                                    <i className={PageStyles.icon}>
                                        {sortState.value === "name" ? (
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
                                    className={Styles.key}
                                    onClick={() => handleSetSort("key")}
                                >
                                    <div className={Styles.text}>Key</div>
                                    <i className={PageStyles.icon}>
                                        {sortState.value === "key" ? (
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
                                    className={Styles.price}
                                    onClick={() => handleSetSort("price")}
                                >
                                    <div className={Styles.text}>Price</div>
                                    <i className={PageStyles.icon}>
                                        {sortState.value === "price" ? (
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
                                                        className={Styles.name}
                                                    >
                                                        {item.name}
                                                    </div>
                                                    <div className={Styles.key}>
                                                        {item.key}
                                                    </div>
                                                    <div
                                                        className={Styles.price}
                                                    >
                                                        {item.price}
                                                    </div>
                                                </div>
                                                <i
                                                    className={clsx(
                                                        PageStyles.icon,
                                                        PageStyles.delete__icon
                                                    )}
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            item._id
                                                        )
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
            <div className={PageStyles.title}>Seat Type</div>
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

            {showAddForm ? <AddModal /> : null}
            {showUpdateForm ? <UpdateModal _id={select} /> : null}
        </div>
    );
}

export default SeatType;
