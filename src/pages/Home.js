import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Cards from '../components/Cards';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorie: '',
      products: [],
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      categorie: value,
    });
  }

  handleClick = async () => {
    const { categorie } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery('', categorie);
    // console.log(getProducts.results);
    this.setState({
      products: getProducts.results,
    });
  }

  render() {
    const { categorie, products } = this.state;
    return (
      <div>
        <input
          type="text"
          value={ categorie }
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shoppingCart" data-testid="shopping-cart-button"> Carrinho </Link>
        <Categories />
        {
          products.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : (
              products.map((prod) => (
                <Cards
                  key={ prod.id }
                  title={ prod.title }
                  thumbnail={ prod.thumbnail }
                  price={ prod.price }
                />
              ))
            )
        }
      </div>
    );
  }
}
