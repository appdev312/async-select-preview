import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './AsyncSelect.css';

export default class AsyncSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      isOpen: false,
      data: [],
    };
    this.performSearch = debounce(this.performSearch, 500);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.setState({
      isOpen: false,
    });
  }

  performSearch = (val) => {
    if (!this.props.loadOptions) {
      return;
    }

    this.setState({
      isFetching: true,
      isOpen: true,
    });
    this.props.loadOptions(val, data => {
      this.setState({
        isFetching: false,
        isOpen: true,
        data,
      });
    });
  }

  handleInputClick = (e) => {
    e.preventDefault();

    if (
      (e.target.value.trim() !== "" || this.state.data.length > 0) &&
      !this.state.isOpen
    ) {
      this.setState({
        isOpen: true,
      });
    }
  }

  handleChange = (e) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(e);
    }

    this.performSearch(e.target.value);
  }

  handleSelect = (item) => {
    if (!this.props.onSelectItem) {
      return;
    }

    this.setState({
      isOpen: false,
    });
    this.props.onSelectItem(item);
  }

  render() {
    const { previewContent } = this.props;
    const { isFetching, isOpen, data } = this.state;

    return (
      <div className={`async-select-wrapper ${isOpen ? "is-open" : "" }`} ref={node => this.node = node}>
        <input type="text" onChange={this.handleChange} onClick={this.handleInputClick} />
        <div className="select-dropdown">
          {isFetching && <p className="loading-indicator">Loading ... </p>}
          {!isFetching && data.length === 0 && (
            <p className="no-results">Not Found!</p>
          )}
          {!isFetching && data.length > 0 && (
            <React.Fragment>
              <div className="select-dropdown__list">            
                <ul>
                  {data.map((item, index) => <li key={index} onClick={() => this.handleSelect(item)}>{item}</li>)}
                </ul>
              </div>
              <div className="select-dropdown__preview">
                {previewContent}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

AsyncSelect.propTypes = {
  loadOptions: PropTypes.func,
  previewContent: PropTypes.node,
  onInputChange: PropTypes.func,
  onSelectItem: PropTypes.func,
};
