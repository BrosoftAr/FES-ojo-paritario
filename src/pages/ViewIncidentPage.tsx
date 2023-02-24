import { Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";
import { Incident, IncidentStatusLabel } from "../shared/Incident";
import { 
  TerritoryTypeLabelEnum,
  ChargeTypeLabelEnum,
  AppealExpirationTypeLabelEnum
} from "../shared/IncidentsTypes";
import get from 'lodash/get';

interface ViewIncidentsPageRouteParams {
  id: string;
}

const Item = ({title, value}) => {
  return (
    <p>
      <strong>{title}</strong>
      <br /> {value}
    </p>
  )
}

const ViewIncidentsPage = () => {
  const match = useRouteMatch<ViewIncidentsPageRouteParams>();
  const incidentId = match.params.id;

  const [incident, setIncident] = useState<Incident>();
  const [isLoading, setIsLoading] = useState(true);

  const parsedIncident = {
    createdAt: moment(get(incident, 'createdAt', '')).format("DD/MM/YYYY") || '-',
    status: IncidentStatusLabel[get(incident, 'status', '-')] || '-',
    name: get(incident, 'name', '-'),
    anonymous: get(incident, 'anonymous', false) ? 'Sí' : 'No',
    email: get(incident, 'email', '-'),
    contact: get(incident, 'contact', '-'),
    territory: TerritoryTypeLabelEnum[get(incident, 'territory', '-')] || '-',
    role: ChargeTypeLabelEnum[get(incident, 'role', '-')] || '-',
    number: get(incident, 'number', '-'),
    votingList: get(incident, 'votingList', '-'),
    politicalParty: get(incident, 'politicalParty', '-'),
    appealExpiration: AppealExpirationTypeLabelEnum[get(incident, 'appealExpiration', '-')] || incident?.appealExpiration || '-',
    breach: get(incident, 'breach', '-'),
    description: get(incident, 'description', '-'),
    attachments: get(incident, 'attachments', []),
  }

  useEffect(() => {
    const fetchIncident = async () => {
      setIsLoading(true);
      const { incident: newIncident } = await FetchService.request(
        ApiEndpoints.INCIDENT_DETAIL,
        {
          body: JSON.stringify({ incidentId }),
        }
      );
      setIncident(newIncident);
      setIsLoading(false);
    };
    fetchIncident();
  }, [incidentId]);

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Detalle de Incidente</PageTitle>
        {!isLoading ? (
          <div>
            <Item title="Fecha de carga:" value={parsedIncident.createdAt} />
            <Item title="Estado:" value={parsedIncident.status} />
            <Item title="Nombre:" value={parsedIncident.name} />
            <Item title="Quiero anonimato para reportar:" value={parsedIncident.anonymous} />
            <Item title="Email:" value={parsedIncident.email} />
            <Item title="Otras forma de contacto:" value={parsedIncident.contact} />
            <Item title="Territorio:" value={parsedIncident.territory} />
            <Item title="Cargos:" value={parsedIncident.role} />
            <Item title="Nº:" value={parsedIncident.number} />
            <Item title="Nombre de Lista:" value={parsedIncident.votingList} />
            <Item title="Partido u Alianza:" value={parsedIncident.politicalParty} />
            <Item title="Plazo de impugnación:" value={parsedIncident.appealExpiration} />
            <Item title="¿Qué no está cumpliendo?:" value={parsedIncident.breach}  />
            <Item title="Comentarios adicionales" value={parsedIncident.description} />

            {parsedIncident.attachments && (
              <p>
                <strong>Archivos adjuntos:</strong>
                <br />
                {parsedIncident.attachments.map(({ fileName, url }) => (
                  <>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      key={fileName}
                    >
                      {fileName}
                    </a>
                    <br />
                  </>
                ))}
              </p>
            )}
          </div>
        ) : (
          <Spin />
        )}
      </ContentContainer>
    </PageContainer>
  );
};
export default ViewIncidentsPage;
