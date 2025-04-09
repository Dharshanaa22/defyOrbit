import React from "react";

const SideBar = () => {
  return (
  <aside className="slide-bar" style={{ backgroundColor: "white", color: "black" }}>
    <div className="close-mobile-menu">
      <a href="/" className="tx-close"></a>
    </div>

    <nav className="side-mobile-menu">
      <a href="/" className="header__logo mb-30">
        <img src="assets/img/logo/logo.svg" alt="" srcSet=""/>
      </a>
      <div className="header-mobile-search">
        <form action="#" role="search">
          <input type="search" placeholder="Search Keywords" />
          <button type="submit">
            <i className="ti-search" />
          </button>
        </form>
      </div>

      <ul id="mobile-menu-active">
        <li>
          <a href="/" style={{ color: "black" }}>Home</a>
        </li>
        <li>
          <a href="#about" className="scrollspy-btn"  style={{ color: "black" }}>
            About
          </a>
        </li>
        <li>
          <a href="#roadmap" className="scrollspy-btn"  style={{ color: "black" }}>
            RoadMap
          </a>
        </li>
        <li>
          <a href="#team" className="scrollspy-btn"  style={{ color: "black" }}>
            Team
          </a>
        </li>
        <li>
          <a href="#!" className=""  style={{ color: "black" }}>
            Blog
          </a>
        </li>
        <li>
          <a href="#!" className=""  style={{ color: "black" }}>
            Get In Touch
          </a>
        </li>

      </ul>
      </nav>
      </aside>
  );
};

export default SideBar;
