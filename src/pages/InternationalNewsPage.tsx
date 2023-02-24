import { Spin } from "antd";
import React from "react";
import ContentContainer from "../components/ContentContainer";
import NewsArticlePreview from "../components/NewsArticlePreview";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import useNewsArticles from "../hooks/useNewsArticles";

const InternationalNewsPage: React.FC = () => {
  const { newsArticles, isLoading } =  useNewsArticles({ scope:"international"});

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Noticias Internacionales</PageTitle>
        {!isLoading ? (
          <ul>
            {newsArticles.map((newsArticle) => (
              <li key={newsArticle._id}>
                <NewsArticlePreview newsArticle={newsArticle} />
              </li>
            ))}
          </ul>
        ) : (
          <Spin />
        )}
      </ContentContainer>
    </PageContainer>
  );
};
export default InternationalNewsPage;
