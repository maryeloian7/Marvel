import { useState, useEffect } from "react";
import "./comicsList.scss";
import MarvelService from "../../services/MarvelServies";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = MarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
    .then(onComicsListLoaded)
  };

  const onComicsListLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }

    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      <ul className="comics__grid">
        {comics.map((item, i) => {
          return (
            <li className="comics__item"
            key={i}>
              <a href="/">
                <img
                  src={item.thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">
                {item.title}
                </div>
                <div className="comics__item-price">{item.price}</div>
              </a>
            </li>
          );
        })}
      </ul>
      <button className="button button__main button__long"
              disabled={newItemLoading}
              style={{ display: comicsEnded ? "none" : "block" }}
              onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
