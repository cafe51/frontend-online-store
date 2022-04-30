import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      local: [],
      priceTotal: 0,
    };
  }

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('prod'));
    this.setState(() => ({
      local,
    }), () => this.calculatePriceTotal());
  }

  calculatePriceTotal = () => {
    const { local } = this.state;
    const arrPriceTotal = local.map((prod) => (
      prod.quant * parseFloat(prod.price)
    ));
    const priceTotal = arrPriceTotal.reduce((acc, curr) => acc + curr);
    this.setState({
      priceTotal,
    });
  }

  comprar = () => {
    localStorage.setItem('prod', JSON.stringify([]));
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const {
      local,
      priceTotal,
    } = this.state;
    return (
      <div className="finalize-main">
        <Link to="/shoppingCart">Carrinho</Link>
        <section className="finalize-container">
          <h2>Revise seus Produtos</h2>
          {
            local.map((prod) => (
              <div
                key={ prod.id }
                className="finalizaProd"
              >
                <img src={ prod.thumbnail } alt="foto do produto" />
                <div>{ prod.title }</div>
                <span>{ prod.quant }</span>
                <div>
                  {
                    `R$${(parseFloat(prod.price) * prod.quant)
                      .toFixed(2).replace('.', ',')}`
                  }
                </div>
              </div>
            ))
          }
          <div
            className="finalize-priceTotal"
          >
            { `Total: R$${(priceTotal).toFixed(2).replace('.', ',')}` }
          </div>
        </section>
        <form action="" className="finalize-container">
          <h2>Informações do comprador</h2>
          <input
            type="text"
            name="name"
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
          />
          <input
            type="email"
            name="email"
            data-testid="checkout-email"
            placeholder="Email"
          />
          <input
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            placeholder="CPF"
          />
          <input
            type="text"
            name="phone"
            data-testid="checkout-phone"
            placeholder="Telefone"
          />
          <input
            type="text"
            name="cep"
            data-testid="checkout-cep"
            placeholder="CEP"
          />
          <input
            type="text"
            name="address"
            data-testid="checkout-address"
            placeholder="Endereço"
          />
          <section>
            <label htmlFor="boleto">
              <input type="radio" name="pay" id="boleto" />
              Boleto
            </label>
            <label htmlFor="visa">
              <input type="radio" name="pay" id="visa" />
              Visa
            </label>
            <label htmlFor="master">
              <input type="radio" name="pay" id="master" />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input type="radio" name="pay" id="elo" />
              Elo
            </label>
          </section>
          <button
            type="submit"
            onClick={ this.comprar }
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
