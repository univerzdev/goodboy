import styled from "styled-components";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export default Container;
