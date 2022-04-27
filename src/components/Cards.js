import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cards extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div
        data-testid="product"
        className="cards"
      >
        <img src={ thumbnail } alt={ `Foto do ${title}` } />
        <h3>{ title }</h3>
        <p>{ price }</p>
        <Link
          to={ `/productDetail/${id}` }
          data-testid="product-detail-link"
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
