import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  componentDidMount() {
    const { getCategoriesApi } = this.props;
    getCategoriesApi();
  }

  render() {
    const { categories, clickButton } = this.props;
    return (
      <div>
        <h3>Categorias</h3>
        {
          categories.map((element) => (
            <button
              key={ element.id }
              type="button"
              data-testid="category"
              onClick={ clickButton }
              name={ element.id }
            >
              { element.name }
            </button>
          ))
        }
      </div>
    );
  }
}

Categories.propTypes = {
  getCategoriesApi: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickButton: PropTypes.func.isRequired,
};
