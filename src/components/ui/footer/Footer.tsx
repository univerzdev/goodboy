import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Socials from "./Socials";
import { colors } from "@/styles/colors";
import { t } from "@/lib/i18n";

type FooterProps = {
  showSocials?: boolean;
};

const Footer = ({ showSocials = true }: FooterProps) => {
  return (
    <StyledFooter>
      <Link href="/" aria-label={t("footer.logoAlt")}>
        <Image src="/icons/logo.svg" alt={t("footer.logoAlt")} width={124} height={32} />
      </Link>
      <FooterMenu>
        {showSocials ? <Socials /> : null}
        <Link href="/kontakt">{t("footer.contact")}</Link>
        <Link href="/o-projekte">{t("footer.about")}</Link>
      </FooterMenu>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.tertiary};
`;

const FooterMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  a {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }
`;

export default Footer;
