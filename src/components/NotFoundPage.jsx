import styled from "@emotion/styled";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// Styled Components

const Section = styled.section`
  min-height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 768px; /* Tailwind max-w-2xl */
  padding: 24px;
`;

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.1); /* Tailwind white */
  padding: 24px;
  margin: 16px; /* Tailwind m-4 */
  border-radius: 8px; /* Tailwind rounded-md */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Tailwind shadow-md */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2rem; /* Tailwind text-3xl */
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Message = styled.p`
  color: #6b7280; /* Tailwind text-gray-500 */
  font-size: 1.25rem; /* Tailwind text-xl */
  margin-bottom: 40px;
`;

const StyledLink = styled(Link)`
  background-color: #c53030; /* Tailwind bg-red-700 */
  color: #ffffff; /* Tailwind text-white */
  font-weight: bold;
  padding: 16px 24px; /* Tailwind py-4 px-6 */
  border-radius: 8px; /* Tailwind rounded */
  text-decoration: none;

  &:hover {
    background-color: #b83c3c; /* Tailwind hover:bg-red-800 */
  }
`;

function NotFoundPage() {
  return (
    <Section>
      <Container>
        <Card>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{
                color: "#f56565",
                fontSize: "4rem",
              }} /* Tailwind text-red-400 text-8xl */
            />
          </IconWrapper>
          <div style={{ textAlign: "center" }}>
            <Title>Page Not Found</Title>
            <Message>The page you are looking for does not exist.</Message>
            <StyledLink to="/">Go Home</StyledLink>
          </div>
        </Card>
      </Container>
    </Section>
  );
}

export default NotFoundPage;
