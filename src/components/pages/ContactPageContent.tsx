import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Footer from "@/components/ui/footer/Footer";
import { t } from "@/lib/i18n";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

const ContactPageContent = () => {
  return (
    <Root>
      <BackLink href="/">
        <Image src="/icons/arrow-narrow-left.svg" alt="" width={20} height={20} aria-hidden="true" />
        <span>{t("form.buttons.back")}</span>
      </BackLink>

      <Title>{t("pages.contact.title")}</Title>

      <CardsWrap>
        <Cards>
          <Card>
            <IconWrap>
              <Image src="/icons/mail.svg" alt={t("pages.contact.cards.email.title")} width={24} height={24} />
            </IconWrap>
            <CardTitle>{t("pages.contact.cards.email.title")}</CardTitle>
            <CardText>{t("pages.contact.cards.email.description")}</CardText>
            <CardLink href={`mailto:${t("pages.contact.cards.email.value")}`}>
              {t("pages.contact.cards.email.value")}
            </CardLink>
          </Card>

          <Card>
            <IconWrap>
              <Image src="/icons/pin.svg" alt={t("pages.contact.cards.office.title")} width={24} height={24} />
            </IconWrap>
            <CardTitle>{t("pages.contact.cards.office.title")}</CardTitle>
            <CardText>{t("pages.contact.cards.office.description")}</CardText>
            <CardLink href={t("pages.contact.cards.office.link")}>{t("pages.contact.cards.office.value")}</CardLink>
          </Card>

          <Card>
            <IconWrap>
              <Image src="/icons/phone.svg" alt={t("pages.contact.cards.phone.title")} width={24} height={24} />
            </IconWrap>
            <CardTitle>{t("pages.contact.cards.phone.title")}</CardTitle>
            <CardText>{t("pages.contact.cards.phone.description")}</CardText>
            <CardLink href={`tel:${t("pages.contact.cards.phone.linkValue")}`}>
              {t("pages.contact.cards.phone.value")}
            </CardLink>
          </Card>
        </Cards>
      </CardsWrap>

      <ImageSection>
        <ImageFrame>
          <Image
            src="/images/about.webp"
            alt={t("pages.contact.title")}
            width={1490}
            height={500}
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1200px"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </ImageFrame>
      </ImageSection>

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
  gap: 40px;
  padding: 60px 80px;
  animation: ${pageEnter} 520ms ease;
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

const CardsWrap = styled.div`
  margin: 0 32px;
`;

const Cards = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin: 0;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(79, 70, 229, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  margin: 0 0 8px;
  color: ${colors.primary};
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
`;

const CardText = styled.p`
  margin: 0;
  color: ${colors.tertiary};
  ${typography.text.md.regular}
`;

const CardLink = styled.a`
  margin-top: 20px;
  color: ${colors.action.primary.base};
  ${typography.text.md.medium}
`;

const ImageSection = styled.div`
  padding: 0 80px;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 376px;
  border-radius: 20px;
  overflow: hidden;
`;

const FooterWrap = styled.div`
  margin-top: 0;
  padding-top: 16px;
  border-top: 1px solid ${colors.quintarny};
`;

export default ContactPageContent;
