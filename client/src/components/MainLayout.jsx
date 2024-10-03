import { Fragment } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

function MainLayout({children}) {
  return (
    <Fragment>
      <Header />
      <main className="grid">
      {children}
      </main>
      <Footer/>
    </Fragment>
  );
}

export default MainLayout;