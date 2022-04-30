import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { getProductDetail } from '../services/api';
// import FormProductDetail from '../components/FormProductDetail';

export default class CartCounter extends Component {
  constructor() {
    super();
    this.state = {
      totalCart: 0,
    };
  }

  componentDidMount() {
    const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    const total = totalArray.reduce((result, acc) => acc + result, 0);
    this.setState({ totalCart: total });
  }

  render() {
    const { totalCart } = this.state;

    return (
      <div>
        {totalCart}
      </div>
    );
  }
}

// ProductDetail.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };
