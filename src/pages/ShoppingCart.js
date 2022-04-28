import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  render() {
    const local = JSON.parse(localStorage.getItem('prod'));
    // console.log(JSON.parse(localStorage.getItem('prod')));
    // console.log(local);
    return (
      <div>
        {
          local !== null
            ? (
              local.map((prod, i) => (
                <div
                  key={ i }
                >
                  <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                  <img src={ prod.thumbnail } alt="Foto do Produto" />
                  <p>{ parseFloat(prod.price) * prod.quant }</p>
                  <p data-testid="shopping-cart-product-quantity">{ prod.quant }</p>
                </div>
              ))
            )
            : (
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            )
        }
      </div>
    );
  }
}
