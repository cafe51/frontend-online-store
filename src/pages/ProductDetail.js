import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../services/api';
import FormProductDetail from '../components/FormProductDetail';

export default class ProductDetail extends Component {
  constructor() {
    const local = JSON.parse(localStorage.getItem('prod'));
    const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    const total = totalArray.reduce((result, acc) => acc + result);

    super();
    this.state = {
      thumbnail: '',
      title: '',
      price: 0,
      attributes: [],
      totalCart: local.length === 0 ? 0 : total,
      // coisa: 0,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductDetail(id);
    // console.log(product);
    const { thumbnail, title, price, attributes } = product;

    this.setState({
      thumbnail,
      title,
      price,
      attributes,
      id,
    });
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
    this.setState({ totalCart: total });
    // console.log(this.state.carrinhoTotal)
  }

  render() {
    const { thumbnail, title, price, attributes, id, totalCart } = this.state;
    // const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    // const total = totalArray.reduce((result, acc) => acc + result);

    const cartLink = (
      <div>
        Carrinho
        <div data-testid="shopping-cart-size">
          {/* { coisa } */}
          { totalCart }
        </div>
      </div>
    );

    const producDetail = (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <p>{ price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addCarrinho({ id, thumbnail, title, price }) }
        >
          Adicionar ao carrinho
        </button>
        <img src={ thumbnail } alt={ title } />
        {
          attributes.map((att, i) => (
            <p key={ i }>
              {`${att.name}: ${att.value_name}`}
            </p>
          ))
        }
      </div>
    );

    return (
      <div>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          { cartLink }
        </Link>
        { producDetail }
        <FormProductDetail />
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
