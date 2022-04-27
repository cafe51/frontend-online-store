import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Cards from '../components/Cards';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      nameProduct: '',
      products: [],
      categories: [],
      nameCategory: '',
      idCategory: '',
    };
  }

  getCategoriesApi = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  getProductsApi = async () => {
    const { nameCategory, categories, nameProduct } = this.state;
    const idCategory = categories.find((element) => element.name === nameCategory);
    const getProducts = await getProductsFromCategoryAndQuery(idCategory.id, nameProduct);
    console.log(getProducts);
    this.setState({
      products: getProducts.results,
      idCategory,
    });
  }

  clickButton = ({ target }) => {
    this.setState(() => ({
      nameCategory: target.innerHTML,
    }), this.getProductsApi);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      nameProduct: value,
    });
  }

  handleClick = async () => {
    const { nameProduct, idCategory } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery(idCategory.id, nameProduct);
    this.setState({
      products: getProducts.results,
    });
  }

  render() {
    const { nameProduct, products, categories } = this.state;
    return (
      <div>
        <section>
          <input
            type="text"
            value={ nameProduct }
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
        </section>
        <main className="main">
          <Categories
            categories={ categories }
            getCategoriesApi={ this.getCategoriesApi }
            clickButton={ this.clickButton }
          />
          <section className="cards-container">
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
                      id={ prod.id }
                    />
                  ))
                )
            }
          </section>
        </main>
      </div>
    );
  }
}
