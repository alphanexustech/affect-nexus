import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import DataSeries from '../d3components/DataSeries';
import Wrapper from '../d3components/Wrapper';

export default class BarChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    return (
      // TODO: This needs documentation on how to use it!
      <Wrapper border={this.props.border} borderWeight={this.props.borderWeight} width={this.props.width} height={this.props.height}>
        <DataSeries distinctColors={this.props.distinctColors} fillColors={this.props.fillColors}
          chart={'bar'} modulus={this.props.modulus} title={this.props.title}
          data={this.props.data} width={this.props.width} height={this.props.height}/>
      </Wrapper>
    );

  }

}
