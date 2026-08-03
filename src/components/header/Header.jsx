import React from "react";
import Logo from "./Logo";
import Navlink from "./Navlink";
import Icons from "./Icons";
import "../../css/header.css";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="main-layout">
      <Logo />
      <SearchBar />
      <Navlink />

      <Icons />
    </header>
  );
};

export default Header;
