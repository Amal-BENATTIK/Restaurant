import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <nav className="container-fluid">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink className="nav-link" to="/Search" activeClassName="active">
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Specialites" activeClassName="active">
              Spécialites
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Restaurants">
              Restaurants
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Series">
              Series
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Zones">
              Zones
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Villes">
              Villes
            </NavLink>
          </li>
         
        </ul>
      </nav>
    </header>
  );
}

const Footer = () => {
  return (
    
    <footer className="bg-light text-center text-lg-start ">
      <p className="text-center p-3">© {new Date().getFullYear()} Restaurant Amal </p>
    </footer> 
  );
}

export { Header, Footer };