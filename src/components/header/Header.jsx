import React from "react";
import Logo from "./Logo";
import Navlink from "./Navlink";
import Icons from "./Icons";
import "../../css/header.css";

const Header = () => {
  return (
    <header className="main-layout">
      <Logo />
      <Navlink />
      <Icons />
    </header>
  );
};

export default Header;
