import styled from "@emotion/styled";
import Title from "../custom-components/Title";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
    flex-direction: row;
  }
`;

const LogoImage = styled.img`
  border-radius: 50%;
  width: 200px;
  height: auto;

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 100px;
  }
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoImage src="/logo.jpg" alt="Logo" />
      <Title>HAVE A FUN BY ADDING MUSICS</Title>
    </LogoContainer>
  );
}

export default Logo;
