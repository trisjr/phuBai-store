import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { OptionContext } from "../../../contexts/OptionContext";

import { FaShopify } from "react-icons/fa";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdColorLens, MdOutlineCheck } from "react-icons/md";

function AdminNavbar({ Styles }) {
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);
  const {
    optionState: { theme, sidebar },
    setTheme,
    setSidebar,
  } = useContext(OptionContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const ref1 = useRef();
  const ref2 = useRef();

  const handleOpen = () => {
    setUserDropdown(!userDropdown);
  };

  const handleSetTheme = (theme) => {
    setTheme(theme);
  };

  const handleSetSidebar = () => {
    setSidebar(sidebar === "close" ? "open" : "close");
  };

  const handleLogout = () => {
    logoutUser();
  };

  useOnClickOutside(ref1, ref2, () => setUserDropdown(false));

  return (
    <div className={clsx("navbar", Styles.navbar, Styles[theme])}>
      <div className={Styles.logo} onClick={handleSetSidebar}>
        <i className={clsx(Styles.logo, Styles.icon)}>
          <FaShopify className={Styles.svg} />
        </i>
      </div>
      <div
        className={clsx(Styles.nav__user, Styles.dropdown)}
        onClick={handleOpen}
        ref={ref1}
      >
        <div className={Styles.user}>
          <div className={Styles.user__fullName}>{user.fullName}</div>
        </div>
        <i className={Styles.icon}>
          {userDropdown ? (
            <AiFillCaretUp className={Styles.svg} />
          ) : (
            <AiFillCaretDown className={Styles.svg} />
          )}
        </i>
      </div>
      <div
        className={clsx(
          Styles.dropdown__menu,
          userDropdown ? Styles.open : null
        )}
        ref={ref2}
      >
        <div className={Styles.info}>
          <img
            className={Styles.avatar}
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            alt="avatar"
          />
          <div className={Styles.user}>
            <div className={Styles.fullName}>{user.fullName}</div>
            <div className={Styles.desc}>View your profile page...</div>
          </div>
        </div>
        <hr className={Styles.hr} />
        <div className={clsx(Styles.item, Styles.theme)}>
          <i className={clsx(Styles.item__icon, Styles.icon)}>
            <MdColorLens className={Styles.svg} />
          </i>
          <div className={Styles.item__title}>Theme</div>
          <div className={Styles.item__wrapper}>
            <i
              className={clsx(Styles.color, Styles.icon, Styles.blue)}
              onClick={() => {
                handleSetTheme("blue");
              }}
            >
              {theme === "blue" ? (
                <MdOutlineCheck className={Styles.svg} />
              ) : null}
            </i>
            <i
              className={clsx(Styles.color, Styles.icon, Styles.dark)}
              onClick={() => {
                handleSetTheme("dark");
              }}
            >
              {theme === "dark" ? (
                <MdOutlineCheck className={Styles.svg} />
              ) : null}
            </i>
          </div>
        </div>
        <div className={Styles.item}>
          <div className={clsx(Styles.item__icon, Styles.icon)}>
            <IoMdSettings className={Styles.svg} />
          </div>
          <div className={Styles.item__title}>Setting</div>
        </div>
        <div className={Styles.item} onClick={handleLogout}>
          <div className={clsx(Styles.item__icon, Styles.icon)}>
            <BiLogOut className={Styles.svg} />
          </div>
          <div className={Styles.item__title}>Log out</div>
        </div>
      </div>
    </div>
  );
}

function useOnClickOutside(ref1, ref2, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (
        !ref1.current ||
        ref1.current.contains(event.target) ||
        !ref2.current ||
        ref2.current.contains(event.target)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref1, ref2, handler]);
}

export default AdminNavbar;
