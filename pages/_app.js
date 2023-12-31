import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}
