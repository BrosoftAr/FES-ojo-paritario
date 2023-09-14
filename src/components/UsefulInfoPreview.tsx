import { useHistory } from "react-router";
import styled from "styled-components";
import RoutesEnum from "../shared/RoutesEnum";
import { UsefulInfo } from "../shared/UsefulInfo";

interface UsefulInfoPreviewProps {
  usefulInfo: UsefulInfo;
}

const UsefulInfoPreview: React.FC<UsefulInfoPreviewProps> = ({
  usefulInfo,
}) => {
  const history = useHistory();

  const usefulInfoRoute = RoutesEnum.USEFUL_INFORMATION_VIEW.replace(
    ":id",
    usefulInfo._id.toString()
  );

  const onClick = (e) => {
    e.preventDefault();
    history.push(usefulInfoRoute);
  };

  return (
    <Container>
      <Link href={usefulInfoRoute} onClick={onClick}>
        <Info>
          <Title>{usefulInfo.title}</Title>
          <Description>{usefulInfo.description}</Description>
        </Info>
        <MoreLink>Ver más</MoreLink>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 13px;
  padding: 12px 16px;
`;

const Link = styled.a``;

const Info = styled.div``;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 500;
  font-family: Roboto;
  margin-bottom: 2px;
  margin-top: 0;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: Roboto;
  margin-bottom: 0;
  color: #7e7e7e;
`;

const MoreLink = styled.span``;

export default UsefulInfoPreview;
