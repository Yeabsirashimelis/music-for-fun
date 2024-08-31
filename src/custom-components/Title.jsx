import styled from "@emotion/styled";

const AppTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  background: linear-gradient(to top, rgb(75, 0, 130), rgb(238, 130, 238));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin: 0; /* Remove any extra margin */

  @media (max-width: 1200px) {
    font-size: 40px; /* Smaller text size for medium screens */
  }

  @media (max-width: 900px) {
    font-size: 30px; /* Even smaller text size for small screens */
  }

  @media (max-width: 600px) {
    font-size: 20px; /* Smallest text size for very small screens */
  }
`;

function Title({ children }) {
  return <AppTitle>{children}</AppTitle>;
}

export default Title;
