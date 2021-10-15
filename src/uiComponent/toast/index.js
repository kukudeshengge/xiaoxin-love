import React from 'react';
import ReactDom from 'react-dom';
import {AtToast} from '../index';

class Toast extends React.Component {
  constructor() {
    super();
    this.div = React.createElement('div');
  }

  show = (options) => {
    ReactDom.render(
      <AtToast {...options} />,
      document.body
    )
  }


}

export default new Toast();
