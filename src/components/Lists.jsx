import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import styled from "@emotion/styled";
import Title from "../custom-components/Title";
import Button from "../custom-components/Button";
import Header from "../custom-components/Header";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Error from "./Error";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Default to 1 column */
  gap: 20px;
  padding: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for large screens */
  }
`;

function Lists() {
  const dispatch = useDispatch();
  const musics = useSelector((state) => state.music.musics);
  const loading = useSelector((state) => state.music.loading);
  const error = useSelector((state) => state.music.error);

  useEffect(() => {
    dispatch({ type: "fetchMusicData" });
  }, [dispatch]);

  return (
    <div>
      <Header>
        <Title>Your Musics</Title>

        <Link to="/add-music">
          <Button>Add Music</Button>
        </Link>
      </Header>

      {loading ? (
        <Spinner loading={loading} />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Container>
          {musics.map((music, index) => (
            <Card music={music} key={index} />
          ))}
        </Container>
      )}
    </div>
  );
}

export default Lists;
