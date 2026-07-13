import Image from "next/image";
import DonationForm from "@/components/form/DonationForm";
import { t } from "@/lib/i18n";
import styled from "styled-components";

const HomePageContent = () => {
  return (
    <PageSection>
      <LeftSection>
        <DonationForm />
      </LeftSection>

      <RightSection>
        <ImageFrame>
          <Image src="/images/form.webp" alt={t("app.title")} fill priority sizes="(max-width: 1024px) 100vw, 50vw" />
        </ImageFrame>
      </RightSection>
    </PageSection>
  );
};

const PageSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
  gap: 80px;
  padding: 32px;
`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 40px;
  min-width: 0;
`;

const RightSection = styled.section`
  min-height: 448px;
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;

  > span {
    position: static !important;
  }

  img {
    object-fit: cover;
  }
`;

export default HomePageContent;
