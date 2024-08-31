import styled from "@emotion/styled";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardContainer = styled.div`
  position: relative;
  margin: auto;
  height: 350px;
  width: 100%;
  background: ${({ color1, color2 }) =>
    `linear-gradient(to bottom, ${color1}, ${color2})`};
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ headerColor }) => headerColor};
  font-size: 25px;
  font-family: fantasy;
  font-weight: bolder;
  transform: rotate(-10deg);
`;

const Image = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ headerColor }) => headerColor};
  font-family: cursive;

  font-size: 14px;
  text-align: center;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to bottom, black, rgb(58, 55, 55));
  color: whitesmoke;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to top, black, rgb(58, 55, 55));
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 50px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.7);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  color: black;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const ModalButton = styled.button`
  background: ${({ isCancel }) => (isCancel ? "#ccc" : "#f00")};
  color: ${({ isCancel }) => (isCancel ? "#000" : "#fff")};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ isCancel }) => (isCancel ? "#bbb" : "#d00")};
  }
`;

function Card({ music }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleting = useSelector((state) => state.music.deleting);
  const error = useSelector((state) => state.music.error);

  function handleDelete(id) {
    dispatch({ type: "deleteMusic", payload: id });
    setIsModalOpen(false);
  }

  return (
    <div>
      <CardContainer color1={music.color1} color2={music.color2}>
        <Image src={music.image} alt={music.musicTitle} />
        <Title headerColor={music.headerColor}>{music.musicTitle}</Title>
        <Info headerColor={music.headerColor}>
          <p>By {music.artist}</p>
        </Info>
        <Link to={`music/${music.id}`}>
          <Button>See Details</Button>
        </Link>
        <Link to={`music/edit/${music.id}`}>
          <EditButton>
            <FontAwesomeIcon icon={faEdit} />
          </EditButton>
        </Link>
        <DeleteButton onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteButton>
      </CardContainer>

      {/* Modal for confirming deletion */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this item?</p>
            <div>
              <ModalButton isCancel onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton onClick={() => handleDelete(music.id)}>
                {deleting && "deleting"}
                {error && "can't delete"}
                {!deleting && !error && "delete"}
              </ModalButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

export default Card;
