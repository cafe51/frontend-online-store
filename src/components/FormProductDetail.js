import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { getProductDetail } from '../services/api';

export default class FormProductDetail extends Component {
  constructor() {
    // const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    // const total = totalArray.reduce((result, acc) => acc + result);

    super();
    this.state = {
      avaliacoes: '',
    };
  }

  handleClick = ({ target }) => {
    const email = target.parentElement.childNodes[0].firstChild.value;
    const comentario = target.parentElement.childNodes[1].firstChild.value;
    const avaliacaoObj = {
      email,
      comentario,
    };
    // console.log(avaliacaoObj);
    const { avaliacoes } = this.state;
    this.setState = ({
      avaliacoes: [avaliacaoObj],
    });
    console.log(avaliacoes);
    // console.log(comentario);
    // console.log(avaliacaoObj);
  }

  render() {
    const { avaliacoes } = this.state;
    console.log(avaliacoes);
    // const totalArray = JSON.parse(localStorage.getItem('prod')).map((e) => e.quant);
    // const total = totalArray.reduce((result, acc) => acc + result);
    // const todasAvaliacoes = avaliacoes.map((e) => {
    //   const av = (
    //     <div>
    //       <div>
    //         <p>
    //           Cliente:
    //           {e.mail}
    //         </p>
    //       </div>
    //       <div>
    //         <p>
    //           Comentario:
    //           {e.comentario}
    //         </p>
    //       </div>
    //     </div>
    //   );
    //   return av;
    // });

    return (
      <div>
        <hr />
        <main>
          <h3>Avaliações</h3>
          <section>
            <div>
              <input type="email" placeholder="Email" />
            </div>
            <div>
              <textarea placeholder="Mensagem (opcional)" />
            </div>
            <button type="button" onClick={ this.handleClick }>Avaliar</button>
          </section>
          <hr />
          <section>
            <div>
              {/* { todasAvaliacoes } */}
              oi
            </div>
          </section>
        </main>
        <hr />
      </div>
    );
  }
}

// FormProductDetail.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };
