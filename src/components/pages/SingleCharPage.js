import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleCharPage.scss";

import MarvelService from "../../services/MarvelServies";

const SingleCharPage = () => {
  const { id } = useParams();
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = MarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();
    getCharacter(id).then(onCharLoaded);
  };
  const onCharLoaded = (char) => {
    setChar(char);
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const { name, description, thumbnail } = char || {};

  return (
    <>
    <AppBanner/>
      {errorMessage}
      {spinner}
      {!(loading || error || !char) ?
      <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__char-img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
        </div>
      </div> : null}
    </>
  );
};

export default SingleCharPage;
