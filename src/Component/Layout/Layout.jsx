import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout({ userData,signOut }) {
  return (
    <>
      <Navbar userData={userData} signOut={signOut} />
      <div className="container my-5 py-5">
      <Outlet />
      </div>
      <Footer />
    </>
  );
}
