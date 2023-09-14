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
  font-weight: 700;
  font-family: Roboto;
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "10px")};
`;
export default PageTitle;
