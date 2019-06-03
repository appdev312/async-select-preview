import React, { Component } from 'react';
import ReduxToastr, { toastr } from 'react-redux-toastr'

import AsyncSelect from './components/AsyncSelect/AsyncSelect';
import './App.css';

export default class App extends Component {
  /* async select */
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };
  }

  onItemFocus = item => {
    this.setState({
      item
    });
  }

  onItemBlur = item => {
    if (this.state.item.id === item.id) {
      this.setState({
        item: null,
      });
    }
  }

  loadOptions = (inputValue, callback) => {
    const options = [
      {
        id: 1,
        thumbnail: 'assets/1.png',
        text: 'Lorem ipsum text.',
      },
      {
        id: 2,
        thumbnail: 'assets/2.png',
        text: 'This is buggy screen.',
      },
      {
        id: 3,
        thumbnail: 'assets/3.png',
        text: 'Terminal error.',
      },
      {
        id: 4,
        thumbnail: 'assets/4.png',
        text: 'Python installation',
      },
    ];

    setTimeout(() => {
      const filtered = options.filter(i =>
        i.text.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filtered.map(item =>
        <div
          className="async-item"
          onMouseEnter={() => this.onItemFocus(item)}
          onMouseLeave={() => this.onItemBlur(item)}>
          <img src={item.thumbnail} style={{ width: '100px', height: '100px', }} alt={item.text} />
          <p>{item.text}</p>
        </div>));
    }, 1000);
  };
  /* async select ends  */

  render() {
    return (
      <div className="app">
        <section id="async-select-wrapper">
          <AsyncSelect
            loadOptions={this.loadOptions}
            onSelectItem={item => console.log(item)}
            previewContent={this.state.item ? <img alt={this.state.item.text} src={this.state.item.thumbnail} style={{ width: '100%', height: 'auto', }} /> : null}
          />
        </section>
        <section>
          {/*
            - https://github.com/mgorabbani/react-image-pan-zoom-rotate (image rotate / zoom / panning)
            - https://github.com/chrvadala/react-svg-pan-zoom (svg)
            - https://github.com/rpearce/react-medium-image-zoom (simple image zoom)
          */}
        </section>
        <section>
          <ReduxToastr
            timeOut={5000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          {/* https://github.com/diegoddox/react-redux-toastr */ }
          <button
            onClick={() => toastr.success('The title', 'The message')}
            type="button"
          >
            Toastr Success
          </button>
        </section>
      </div>
    );
  }
}
