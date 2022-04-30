import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cards extends Component {
  /* constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  addCarrinho = () => {
    const { title, thumbnail, price } = this.props;
    const objshoppingCart = {
      title,
      thumbnail,
      price,
    };
    // console.log(shoppingCart);
    const { shoppingCart } = this.state;
    const obj = { ...objshoppingCart }
    shoppingCart.push(obj);
    console.log(shoppingCart);
  } */

  render() {
    const { title, thumbnail, price, id, addCarrinho } = this.props;
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
          <button type="button">Detalhes</button>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addCarrinho({ id, thumbnail, title, price }) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  addCarrinho: PropTypes.func.isRequired,
};
