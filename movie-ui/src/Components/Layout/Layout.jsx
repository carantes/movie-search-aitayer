import React from "react";
import styles from "./Layout.module.css";

const Wrapper = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

const Header = ({ title, children }) => (
  <nav className={styles.header}>
    <h1>{title}</h1>
    {children}
  </nav>
);

const Main = ({ children }) => <main className={styles.main}>{children}</main>;

export default {
  Wrapper,
  Header,
  Main,
};
