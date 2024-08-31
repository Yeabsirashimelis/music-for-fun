import styled from "@emotion/styled";

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center items vertically */
  padding: 10px 20px; /* Adjust padding */
  margin-bottom: 20px; /* Reduced margin */
`;

function Header({ children }) {
  return (
    <>
      <Head>{children}</Head>
    </>
  );
}

export default Header;
