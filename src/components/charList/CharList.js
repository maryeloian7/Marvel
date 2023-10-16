import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import MarvelService from "../../services/MarvelServies";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { charList, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">
          {charList.map((item) => {
            let imgStyle = { objectFit: "cover" };
            if (
              item.thumbnail ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
              imgStyle = { objectFit: "contain" };
            }
            return (
              <li
                className="char__item"
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}
              >
                <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
