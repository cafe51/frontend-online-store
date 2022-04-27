import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetail } from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      thumbnail: '',
      title: '',
      price: 0,
      attributes: [],
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
    });
  }

  render() {
    const { thumbnail, title, price, attributes } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <p>{ price }</p>
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
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
