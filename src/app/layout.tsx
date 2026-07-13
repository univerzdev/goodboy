import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import GlobalStyles from "@/styles/GlobalStyles";
import Container from "@/components/ui/Container";
import ReactQueryProvider from "@/lib/react-query-provider";
import sk from "@/translations/sk";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: sk.app.title,
  description: sk.app.description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="sk" className={`${inter.variable} antialiased`}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ReactQueryProvider>
            <Container>{children}</Container>
          </ReactQueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};
export default RootLayout;
