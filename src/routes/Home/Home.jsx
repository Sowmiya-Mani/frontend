import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Header from "./Header";
import MiddleSection from "./MiddleSection";
import Footer from "./Footer/Footer";

function Home() {
  return (
    <div>
      <NavigationBar />
      <Header />
      <MiddleSection />
      <Footer />
    </div>
  );
}

export default Home;
