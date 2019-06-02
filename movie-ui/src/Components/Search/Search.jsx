import React from "react";
import { Input } from "Components";
import { withHandleSearch } from "HOC";
import styles from "./Search.module.css";

const Search = props => (
  <div className={styles.container}>
    <Input
      type="search"
      placeholder="Search..."
      className={styles.search}
      {...props}
    />
  </div>
);

export default withHandleSearch(Search);
