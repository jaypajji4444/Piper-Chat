import React from 'react';
import { css } from '@emotion/core';
import ClimbingBoxLadder from 'react-spinners/ClimbingBoxLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  border-color: red;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    console.log("hello")
    return (
      <div className="sweet-loading">
        <ClimbingBoxLadder style={{margin:"auto"}}
          css={override}
          size={20}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loader;