import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesApi();
  }

  getCategoriesApi = async () => {
    const categories = await getCategories();
    console.log(categories);
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h3>Categorias</h3>
        {
          categories.map((element) => (
            <button
              key={ element.id }
              type="button"
              data-testid="category"
            >
              { element.name }
            </button>
          ))
        }
      </div>
    );
  }
}
