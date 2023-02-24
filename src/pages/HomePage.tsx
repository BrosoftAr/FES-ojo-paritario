import { Spin } from "antd";
import React from "react";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import IncidentPreview from "../components/IncidentPreview";
import NewsArticlePreview from "../components/NewsArticlePreview";
import PageContainer from "../components/PageContainer";
import UsefulInfoPreview from "../components/UsefulInfoPreview";
import useIncidents from "../hooks/useIncidents";
import useNewsArticles from "../hooks/useNewsArticles";
import useUsefulInfo from "../hooks/useUsefulInfo";
import moment from "moment";

const HomePage: React.FC = () => {
  const { newsArticles, isLoading: isLoadingNews } = useNewsArticles({});
  const { incidents, isLoading: isLoadingIncidents } = useIncidents({ limit: 3 });
  const { usefulInfo, isLoadingUsefulInfo } = useUsefulInfo({ limit: 3 });

  const sorting = (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix();
  const nationalNews = newsArticles.filter(({ scope }) => scope === "national").sort(sorting).slice(0, 3);
  const internationalNews = newsArticles.filter(({ scope }) => scope === "international").sort(sorting).slice(0, 3);

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <Title>Noticias Nacionales</Title>
        {!isLoadingNews ? (
          nationalNews.map((newsArticle, index) => (
            <NewsArticlePreview featured={index === 0} newsArticle={newsArticle} />
          ))) : <Spin />
        }

        <Title>Noticias Internacionales</Title>
        {!isLoadingNews ? (
          internationalNews.map((newsArticle, index) => (
            <NewsArticlePreview featured={index === 0} newsArticle={newsArticle} />
          ))) : <Spin /> 
        }

        <Title>Incidentes</Title>
        {!isLoadingIncidents ? (
          <>
            {incidents.length ? (
              incidents.map((incident) => (
                <IncidentPreview incident={incident} />
              ))
            ) : (
              <span style={{ display: "block", marginBottom: 30 }}>
                No hay incidentes para mostrar
              </span>
            )}
          </>
        ) : (
          <Spin />
        )}

        <Title>Información Útil</Title>
        {!isLoadingUsefulInfo ? (
          usefulInfo.map((usefulInfo) => (
            <UsefulInfoPreview usefulInfo={usefulInfo} />
          ))
        ) : (
          <Spin />
        )}
      </ContentContainer>
    </PageContainer>
  );
};

const Title = styled.h2`
  font-size: 17px;
  font-family: "Graphik";
  font-weight: 500;
  margin-bottom: 10px;
`;
export default HomePage;
