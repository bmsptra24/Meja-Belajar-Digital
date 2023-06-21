// import React from "react";
import "../styles/LandingPage.css";
import Avatar from "../assets/image/avatar.png";

const LandingPage = ({ setNavigator }) => {
  return (
    <div className="main-container-landingpage">
      <div className="container-landingpage">
        <div className="isi_konten">
          <img className="gambar_mdb" src={Avatar} alt="" />
          <div className="navbar-landingpage"></div>
          <nav className="navigasi-landingpage">
            <a className="link_logo" href="#">
              MBD
            </a>
            <a className="link1" href="#">
              Product
            </a>
            <a className="link2" href="#">
              About Us
            </a>
            <a className="link3" href="#">
              Profile
            </a>
          </nav>
          <a className="link4" onClick={() => setNavigator(1)}>
            Log in
          </a>
          <a className="link5" onClick={() => setNavigator(2)}>
            Sign Up
          </a>

          <p className="judul_kecil">Meja Belajar Digital</p>
          <h1 className="caption_besar">
            We Make <br />
            Your Study Different
          </h1>
          <a href="#" className="try_mdb" onClick={() => setNavigator(2)}>
            Try MBD
          </a>
          <a className="read_about" href="#">
            Read about MBD
          </a>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
