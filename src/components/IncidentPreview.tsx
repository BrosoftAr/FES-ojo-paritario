import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";
import { Incident } from "../shared/Incident";
import RoutesEnum from "../shared/RoutesEnum";
import Button from "./Button";

interface IncidentPreviewProps {
  incident: Incident;
}

const IncidentPreview: React.FC<IncidentPreviewProps> = ({ incident }) => {
  const history = useHistory();

  const incidentRoute = RoutesEnum.INCIDENTS_VIEW.replace(
    ":id",
    incident._id.toString()
  );

  const onClick = (e) => {
    e.preventDefault();
    history.push(incidentRoute);
  };

  return (
    <Container>
      <Link href={incidentRoute} onClick={onClick}>
        <Info>
          {/* <Title>Inc. {IncidentTypeLabelEnum[incident.situation]}</Title> */}
          <Description>
            {moment(incident.createdAt).format("DD/MM/YYYY")}
          </Description>
        </Info>
        <Actions>
          <Button>Ver detalle</Button>
        </Actions>
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

const Link = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div``;

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

const Actions = styled.div``;

export default IncidentPreview;
