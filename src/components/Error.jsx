import React from "react";
import styled from "@emotion/styled";
import Button from "../custom-components/Button";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffe5e5; /* Light red background */
  border: 1px solid #ff4d4d; /* Red border */
  border-radius: 10px;
  margin: 20px;
`;

const ErrorTitle = styled.h2`
  color: #ff4d4d;
  margin-bottom: 10px;
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  color: #333;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const Error = ({ error }) => {
  // Ensure error is a string for safe rendering
  const errorMessage =
    typeof error === "string" ? error : "An unexpected error occurred.";

  return (
    <ErrorContainer>
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </ErrorContainer>
  );
};

export default Error;
