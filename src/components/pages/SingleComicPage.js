import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./singleComic.scss";
import MarvelService from "../../services/MarvelServies";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic, clearError } = MarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };
  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const { title, description, pageCount, thumbnail, language, price } =
    comic || {};

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {!(loading || error || !comic) ? (
        <div className="single-comic">
          <img src={thumbnail} alt={title} className="single-comic__img" />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{price}</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default SingleComicPage;
