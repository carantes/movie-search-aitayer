import React, { Component } from "react";
import PropTypes from "prop-types";

const withHandleSearch = WrappedComponent => {
  class With extends Component {
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
      return <WrappedComponent onChange={this.handleChange} {...this.props} />;
    }
  }

  // With.defaultProps = {
  //   startWith: 3,
  //   waitInterval: 0,
  // };

  // With.propTypes = {
  //   onSearch: PropTypes.func.isRequired,
  //   startWith: PropTypes.number,
  //   waitInterval: PropTypes.number,
  // };

  return With;
};

export default withHandleSearch;
