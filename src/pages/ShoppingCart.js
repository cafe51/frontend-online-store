import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      local: [],
      isDisabled: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('prod') === null) {
      localStorage.setItem('prod', JSON.stringify([]));
    } else {
      const local = JSON.parse(localStorage.getItem('prod'));
      this.setState({
        local,
      });
    }
  }

  handleClickIncrease = (id) => {
    const { local } = this.state;
    const increase = local.find((prod) => prod.id === id);
    if (increase.availableQuantity <= increase.quant) {
      this.setState({
        isDisabled: true,
      });
    } else {
      increase.quant += 1;
      this.setState(() => ({
        local,
      }), () => localStorage.setItem('prod', JSON.stringify(local)));
    }
  }

  handleClickDecrease = (id) => {
    const { local } = this.state;
    const decrease = local.find((prod) => prod.id === id);
    if (decrease.quant > 0) {
      decrease.quant -= 1;
    }
    this.setState(() => ({
      local,
      isDisabled: false,
    }), () => localStorage.setItem('prod', JSON.stringify(local)));
  }

  handleClickRemove = (id) => {
    const { local } = this.state;
    const remove = local.filter((prod) => prod.id !== id);
    localStorage.setItem('prod', JSON.stringify(remove));
    this.setState({
      local: remove,
    });
  }

  render() {
    const { local, isDisabled } = this.state;
    // console.log(local);
    return (
      <div>
        <Link to="/">Home</Link>
        {
          local.length !== 0 || local === undefined
            ? (
              local.map((prod, i) => (
                <div
                  key={ i }
                >
                  <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                  <img src={ prod.thumbnail } alt="Foto do Produto" />
                  <p>
                    {
                      `R$${(parseFloat(prod.price) * prod.quant)
                        .toFixed(2).replace('.', ',')}`
                    }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">{ prod.quant }</p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleClickIncrease(prod.id) }
                    disabled={ isDisabled }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleClickDecrease(prod.id) }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickRemove(prod.id) }
                  >
                    X
                  </button>
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
        <button
          type="submit"
          data-testid="checkout-products"
          onClick={ () => {
            const { history } = this.props;
            history.push('/checkout');
          } }
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
