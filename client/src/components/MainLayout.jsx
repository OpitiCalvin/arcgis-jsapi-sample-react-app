import { Fragment } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

function MainLayout({children}) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer/>
    </Fragment>
  );
}

export default MainLayout;