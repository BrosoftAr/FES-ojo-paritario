import styled from "styled-components";

interface PageTitleProps {
  noMargin?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  noMargin = false,
}) => {
  return <Title noMargin={noMargin}>{children}</Title>;
};
const Title = styled.h1<{ noMargin: boolean }>`
  font-size: 18px;
  font-family: "Graphik";
  font-weight: 700;
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "10px")};
`;
export default PageTitle;
