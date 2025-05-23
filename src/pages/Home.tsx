import { Link } from "react-router-dom";
import styled from "styled-components";
import splash from "../assets/splash-image.png";
import { Container, BaseHeading, BaseButton } from "../styles/shared";
import { Spacing } from "../styles/variables";

export default function Home() {
  return (
    <HomeContainer>
      <ContentBox>
        <SplashImage src={splash} alt="App splash image" />
        <Heading>Stay on top of tasks, stress-free</Heading>
      </ContentBox>
      <StyledLink to="/tasks">
        <Button>Get started</Button>
      </StyledLink>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  ${Container} display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spacing.xl};
  width: 100%;
`;

const SplashImage = styled.img`
  width: 100%;
  max-width: 299px;
  height: auto;
  object-fit: cover;
`;

const Heading = styled.p`
  ${BaseHeading}
  font-size: 32px;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const StyledLink = styled(Link)`
  width: 100%;
  max-width: 344px;
  text-decoration: none;
`;

const Button = styled.button`
  ${BaseButton} display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm};
  font-size: 20px;
  width: 100%;
`;
