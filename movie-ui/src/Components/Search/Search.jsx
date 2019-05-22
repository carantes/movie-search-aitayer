import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Search.module.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.timer = null;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    clearTimeout(this.timer);
    const param = e.target.value;
    const { onSearch, startWith = 3, waitInterval = 0 } = this.props;
    this.timer = setTimeout(() => {
      if (param.length >= startWith) {
        onSearch(param);
      }
    }, waitInterval);
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          type="search"
          placeholder="Search..."
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Search.defaultProps = {
  startWith: 3,
  waitInterval: 0,
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  startWith: PropTypes.number,
  waitInterval: PropTypes.number,
};

export default Search;
