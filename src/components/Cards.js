import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cards extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div
        data-testid="product"
        className="cards"
      >
        <img src={ thumbnail } alt={ `Foto do ${title}` } />
        <h3>{ title }</h3>
        <p>{ price }</p>
      </div>
    );
  }
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
