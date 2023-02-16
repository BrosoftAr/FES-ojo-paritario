import { useHistory } from "react-router";
import styled from "styled-components";
import { NewsArticle } from "../shared/NewsArticle";
import RoutesEnum from "../shared/RoutesEnum";

interface NewsArticlePreviewProps {
  newsArticle: NewsArticle;
  featured?: boolean;
}

const NewsArticlePreview: React.FC<NewsArticlePreviewProps> = ({
  newsArticle,
  featured = false,
}) => {
  const history = useHistory();

  const articleRoute = RoutesEnum.NEWS_ARTICLE.replace(":id", newsArticle._id);

  const onClick = (e) => {
    e.preventDefault();
    history.push(articleRoute);
  };

  return (
    <Container>
      <Link featured={featured} href={articleRoute} onClick={onClick}>
        <Image featured={featured} src={newsArticle.thumbnail.url}></Image>
        <Info featured={featured}>
          <Title>{newsArticle.title}</Title>
          <Description>{newsArticle.description}</Description>
        </Info>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 13px;
  padding: 14px 16px;
`;

const Link = styled.a<{ featured: boolean }>`
  display: ${(props) => (props.featured ? "block" : "flex")};
`;

const Image = styled.div<{ featured: boolean; src: string }>`
  width: ${(props) => (props.featured ? "100%" : "70px")};
  height: ${(props) => (props.featured ? "100%" : "70px")};
  padding-bottom: ${(props) => (props.featured ? "54.22%" : "0")};
  position: relative;
  overflow: hidden;
  border-radius: 13px;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src});
  margin-right: ${(props) => (props.featured ? "0" : "15px")};
`;

const Info = styled.div<{ featured: boolean }>`
  margin-top: ${(props) => (props.featured ? "7px" : "-4px")};
`;

const Title = styled.h3`
  font-size: 17px;
  font-family: "Graphik";
  font-weight: 500;
  margin-bottom: 2px;
`;

const Description = styled.p`
  font-size: 14px;
  font-family: "Graphik";
  font-weight: 400;
  margin-bottom: 0;
  color: #7e7e7e;
`;

export default NewsArticlePreview;
