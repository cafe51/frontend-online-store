import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Cards from '../components/Cards';
import {
  getProductsFromCategoryAndQuery, getCategories,
} from '../services/api';
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
      carrinhoTotal: 0,
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
    console.log(getProducts); // console de onde estou trabalhando
  }

  addCarrinho = (product) => {
    const local = JSON.parse(localStorage.getItem('prod'));
    let findProduct = local === null
      ? undefined : local.find((prod) => prod.id === product.id);
    let list = [];
    if (findProduct !== undefined) {
      findProduct.quant += 1;
      const indexProd = local.find((prod, i) => i.id === product.id);
      local[indexProd] = findProduct;
      list = local;
    } else {
      findProduct = { ...product, quant: 1 };
      list = local !== null ? [...local, findProduct] : [findProduct];
    }
    localStorage.setItem('prod', JSON.stringify(list));

    const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    const total = totalArray.reduce((result, acc) => acc + result);
    this.setState({ carrinhoTotal: total });
  }

  render() {
    const { nameProduct, products, categories, carrinhoTotal } = this.state;
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
          <Link to="/shoppingCart" data-testid="shopping-cart-button">
            <div>
              Carrinho
              <div data-testid="shopping-cart-size">{ carrinhoTotal }</div>
            </div>
          </Link>
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
                      availableQuantity={ prod.available_quantity }
                      addCarrinho={ this.addCarrinho }
                      freeShipping={ prod.shipping.free_shipping }
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
