import styled from "@emotion/styled";

const Btn = styled.button`
  background: linear-gradient(to top, rgb(75, 0, 130), rgb(238, 130, 238));
  color: whitesmoke;
  padding: 10px 20px; /* Adjust padding for better fit */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Adjust font size */
  cursor: pointer; /* Add pointer cursor */
  transition: background 0.3s ease; /* Smooth background transition */

  &:hover {
    background: linear-gradient(
      to top,
      rgb(75, 0, 130),
      rgb(200, 130, 238)
    ); /* Lighter gradient on hover */
  }
`;

function Button({ children }) {
  return (
    <>
      <Btn>{children}</Btn>
    </>
  );
}

export default Button;
