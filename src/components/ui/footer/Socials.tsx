import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Socials = () => {
  return (
    <SocialsContainer>
      <Link href="#" aria-label="Facebook">
        <Image src="/icons/facebook.svg" alt="Facebook" width={16} height={16} />
      </Link>
      <Link href="#" aria-label="Instagram">
        <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
      </Link>
    </SocialsContainer>
  );
};

const SocialsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
`;
export default Socials;
