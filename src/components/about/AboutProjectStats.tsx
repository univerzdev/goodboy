"use client";

import styled from "styled-components";
import { useShelterResultsQuery } from "@/api/shelters/queries";
import i18next, { t } from "@/lib/i18n";
import { colors } from "@/styles/colors";

const AboutProjectStats = () => {
  const { data } = useShelterResultsQuery();
  const locale = i18next.language === "cz" ? "cs-CZ" : "sk-SK";
  const contributionValue = data?.contribution ?? 0;
  const contributorsValue = data?.contributors ?? 0;

  const formattedContribution = `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(contributionValue)} €`;

  const formattedContributors = new Intl.NumberFormat(locale).format(contributorsValue);

  return (
    <Stats>
      <Stat>
        <StatValue>{formattedContribution}</StatValue>
        <StatLabel>{t("pages.about.stats.amount.label")}</StatLabel>
      </Stat>

      <Stat>
        <StatValue>{formattedContributors}</StatValue>
        <StatLabel>{t("pages.about.stats.donors.label")}</StatLabel>
      </Stat>
    </Stats>
  );
};

const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  margin: 0 32px;
  padding: 64px 0;
  border-top: 1px solid ${colors.quintarny};
  border-bottom: 1px solid ${colors.quintarny};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.p`
  margin: 0;
  color: ${colors.action.primary.base};
  font-size: 63px;
  line-height: 70px;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const StatLabel = styled.p`
  margin: 12px 0 0;
  color: ${colors.primary};
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
`;

export default AboutProjectStats;
