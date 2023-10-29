import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import MarvelService from "../../services/MarvelServies";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { loading, error, getComic, getCharacter, clearError } =
    MarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
    }
  };
  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};


export default SinglePage;
