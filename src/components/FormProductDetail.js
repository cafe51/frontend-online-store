import React, { Component } from 'react';

export default class FormProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      avaliacoes: [],
      nota: 0,
      isDisable: true,
    };
  }

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('avaliacoesLocalStorage')) === null
      ? []
      : JSON.parse(localStorage.getItem('avaliacoesLocalStorage'));
    this.setState({ avaliacoes: [...local] });
  }

  clickButtonAvaliar = ({ target }) => {
    const email = target.parentElement.childNodes[0].firstChild.value;
    const { nota } = this.state;
    const comentario = target.parentElement.childNodes[2].firstChild.value;
    const avaliacaoObj = {
      email,
      nota,
      comentario,
    };
    const { avaliacoes } = this.state;
    this.setState({
      avaliacoes: [...avaliacoes, avaliacaoObj],
    }, () => {
      const { avaliacoes: avaliacoesAtual } = this.state; // PARA NAO DAR PROBLEMA NO LINT FIZ ESSA DESESTRUTURAÇÃO DANDO UM NOVO NOME
      localStorage.setItem('avaliacoesLocalStorage', JSON.stringify(avaliacoesAtual));
    });
  }

  clickRadioBNota = ({ target }) => {
    this.setState({ nota: target.value, isDisable: false });
  }

  render() {
    const { avaliacoes, isDisable } = this.state;
    const todasAvaliacoes = avaliacoes.map((element, index) => {
      const formatoImpressaoComentario = (
        <div key={ `${element.email}+${index}` }>
          <p>
            {element.email}
          </p>
          <p>
            {element.nota}
          </p>
          <p>
            {element.comentario}
          </p>
          <hr />
        </div>
      );
      return formatoImpressaoComentario;
    });
    return (
      <div>
        <hr />
        <h3>Avaliações</h3>
        <section>
          <span>
            <input
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
            />
          </span>
          <span>
            <label htmlFor="radio1">
              <input
                type="radio"
                data-testid="1-rating"
                name="nota"
                id="radio1"
                value="★"
                onClick={ this.clickRadioBNota }
              />
              ★
            </label>
            <label htmlFor="radio2">
              <input
                type="radio"
                data-testid="2-rating"
                name="nota"
                id="radio2"
                value="★★"
                onClick={ this.clickRadioBNota }
              />
              ★★
            </label>
            <label htmlFor="radio3">
              <input
                type="radio"
                data-testid="3-rating"
                name="nota"
                id="radio3"
                value="★★★"
                onClick={ this.clickRadioBNota }
              />
              ★★★
            </label>
            <label htmlFor="radio4">
              <input
                type="radio"
                data-testid="4-rating"
                name="nota"
                id="radio4"
                value="★★★★"
                onClick={ this.clickRadioBNota }
              />
              ★★★★
            </label>
            <label htmlFor="radio5">
              <input
                type="radio"
                data-testid="5-rating"
                name="nota"
                id="radio5"
                value="★★★★★"
                onClick={ this.clickRadioBNota }
              />
              ★★★★★
            </label>
          </span>
          <div>
            <textarea
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
            />
          </div>
          <button
            type="button"
            onClick={ this.clickButtonAvaliar }
            data-testid="submit-review-btn"
            disabled={ isDisable }
          >
            Avaliar
          </button>
        </section>
        <hr />
        <section>
          { todasAvaliacoes }
        </section>
        <hr />
      </div>
    );
  }
}
