import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Button from "../custom-components/Button"; // Assuming you have this component
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

const PageContainer = styled.div`
  padding: 2rem;
  margin: auto;
  background: ${({ color1, color2 }) =>
    `linear-gradient(to bottom, ${color1}, ${color2})`};
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border: 2px solid ${({ color2 }) => color2};
  font-family: cursive;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: ${({ headerColor }) => headerColor};
  font-size: 3rem;
  text-align: center;
`;
const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ color1 }) => color1};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: ${({ headerColor }) => headerColor};
  font-size: 1.25rem;
  line-height: 2.2rem;
`;

const DetailItem = styled.li`
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: translateX(5px);
    color: ${({ color1 }) => color1};
  }
`;

const Description = styled.p`
  color: ${({ headerColor }) => headerColor};
  font-size: 1.5rem;
  margin-top: 1.5rem;
  font-weight: 400;
  line-height: 1.6;
`;

const CustomButton = styled(Button)`
  background: ${({ color1, color2 }) =>
    `linear-gradient(to right, ${color1}, ${color2})`};
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ color2, color1 }) =>
      `linear-gradient(to right, ${color2}, ${color1})`};
  }
`;

function Details() {
  const dispatch = useDispatch();
  const music = useSelector((state) => state.music.music);
  const loading = useSelector((state) => state.music.loading);
  const error = useSelector((state) => state.music.error);
  console.log(error);
  const { id } = useParams();

  console.log(music);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    dispatch({ type: "fetchSelectedMusicData", payload: id });
  }, [dispatch]);

  if (loading) return <Spinner loading={loading} />;
  if (error) return <Error error={error.message} />;
  return (
    <PageContainer color1={music.color1} color2={music.color2}>
      <Header>
        <Link to="/">
          <CustomButton color1={music.color1} color2={music.color2}>
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Home
          </CustomButton>
        </Link>
        <Title headerColor={music.headerColor}>{music.musicTitle}</Title>
      </Header>

      <Image src={music.image} alt={music.musicTitle} color1={music.color1} />

      <DetailsList headerColor={music.headerColor} color1={music.color1}>
        <DetailItem>
          <strong>Artist:</strong> {music.artist}
        </DetailItem>
        <DetailItem>
          <strong>Album:</strong> {music.album}
        </DetailItem>

        <DetailItem>
          <strong>Genre:</strong> {music.genre}
        </DetailItem>
        <DetailItem>
          <strong>Duration:</strong> {music.duration}
        </DetailItem>
      </DetailsList>

      <Description headerColor={music.headerColor}>
        your description: {music.description}
      </Description>
    </PageContainer>
  );
}

export default Details;
