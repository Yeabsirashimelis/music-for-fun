import styled from "@emotion/styled";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

// Styled components for the layout
const LayoutContainer = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-rows: auto 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
  }
`;

const MainContent = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
  background-color: black;
  border-radius: 2px;

  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;

const ContentWrapper = styled.main`
  max-width: 70rem;
  margin: 0 auto;
`;

function LayoutComponent() {
  return (
    <LayoutContainer>
      <Logo />
      <MainContent>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
}

export default LayoutComponent;
