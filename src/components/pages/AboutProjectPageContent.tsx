import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import AboutProjectStats from "@/components/about/AboutProjectStats";
import Footer from "@/components/ui/footer/Footer";
import { t } from "@/lib/i18n";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

const AboutProjectPageContent = () => {
  return (
    <Root>
      <MainContent>
        <BackLink href="/">
          <Image src="/icons/arrow-narrow-left.svg" alt="" width={20} height={20} aria-hidden="true" />
          <span>{t("form.buttons.back")}</span>
        </BackLink>

        <Title>{t("pages.about.title")}</Title>

        <ContentWrap>
          <Lead>{t("pages.about.lead")}</Lead>

          <AboutProjectStats />

          <Body>{t("pages.about.body")}</Body>
        </ContentWrap>
      </MainContent>

      <FooterWrap>
        <Footer showSocials={false} />
      </FooterWrap>
    </Root>
  );
};

const pageEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Root = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 964px;
  padding: 60px 80px;
  animation: ${pageEnter} 520ms ease;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${colors.action.primary.base};
  ${typography.text.md.medium}
`;

const Title = styled.h1`
  margin: 0;
  ${typography.heading.lg}
`;

const ContentWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Lead = styled.p`
  margin: 0;
  color: ${colors.tertiary};
  ${typography.text.md.regular}
`;

const Body = styled.p`
  margin: 0;
  color: ${colors.tertiary};
  ${typography.text.md.regular}
`;

const FooterWrap = styled.div`
  margin-top: 0;
  padding-top: 16px;
  border-top: 1px solid ${colors.quintarny};
`;

export default AboutProjectPageContent;
