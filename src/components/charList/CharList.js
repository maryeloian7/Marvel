import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import MarvelService from "../../services/MarvelServies";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(213);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setNewItemLoading((newCharList) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      <ul className="char__grid">
        {charList.map((item, i) => {
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
              onClick={() => props.onCharSelected(item.id)}
              tabIndex={0}
              onFocus={() => props.onCharSelected(item.id)}
            >
              <img src={item.thumbnail} alt="abyss" style={imgStyle} />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
