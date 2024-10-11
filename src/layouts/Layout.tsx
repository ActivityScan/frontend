import { PropsWithChildren } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Layout.module.scss";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
