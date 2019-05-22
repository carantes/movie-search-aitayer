import React from "react";
import styles from "./Layout.module.css";

const Wrapper = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

const Header = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

const Detail = ({ children }) => <div className={styles.main}>{children}</div>;

export default {
  Wrapper,
  Header,
  Detail,
};
