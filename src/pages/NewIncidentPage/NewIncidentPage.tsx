import {
  Form,
  message,
} from "antd";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ContentContainer from "../../components/ContentContainer";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import FetchService from "../../shared/FetchService";
import ApiEndpoints from "../../shared/ApiEndpoints";
import { useHistory } from "react-router-dom";
import RoutesEnum from "../../shared/RoutesEnum";
import {
  TerritoryTypeEnum,
  TerritoryTypeLabelEnum,
  ChargeTypeEnum,
  ChargeTypeLabelEnum,
  AppealExpirationTypeEnum,
  AppealExpirationTypeLabelEnum
} from "../../shared/IncidentsTypes";
import FormInput from "../../components/Form/Input";
import FormSelect from "../../components/Form/Select";
import FormTextArea from "../../components/Form/TextArea";
import FormCheckbox from "../../components/Form/Checkbox";
import FormInputNumber from "../../components/Form/InputNumber";
import { Moment } from "moment";
import AttachmentUpload from "./components/AttachmentUpload";
import ExpirationDate from "./components/ExpirationDate";
import { FileListItem, IncidentForm } from '../../shared/Incident';

interface FormValues extends IncidentForm {
  appealExpirationCategory: string;
  appealExpirationDate: Moment;
}

const FormInitialValue = {
  contact: "",
  breach: "",
  description: "",
  attachments: [],
};

const NewIncidentPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const [expirationType, setExpirationType] = useState<string>('');
  const hasUploadingFileListItem = !!fileList.find((fileListItem) => fileListItem.status === "uploading");

  const submit = async (formValues: FormValues) => {
    const closeLoading = message.loading("Enviando incidente...");

    try {
      setIsSubmitting(true);
      const { 
        attachments, 
        appealExpirationCategory, 
        appealExpirationDate,
        ...rest
      } = formValues;

      const appealExpiration = appealExpirationCategory === "FECHA" ? appealExpirationDate.format("DD/MM/YYYY") : appealExpirationCategory;

      await FetchService.request(ApiEndpoints.INCIDENT_ADD, {
        body: JSON.stringify({
          ...rest,
          appealExpiration,
          attachments: fileList.map((file) => ({
            fileName: file.name,
            fileKey: file.fileKey,
          })),
        }),
      });

      message.success("Incidente enviado!", 2);
      history.push(RoutesEnum.INCIDENTS);
    } catch (e) {
      message.error("Error al enviar el incidente");
    } finally {
      setIsSubmitting(false);
      closeLoading();
    }
  };

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Nuevo incidente</PageTitle>
        <Form onFinish={submit} initialValues={FormInitialValue} >
          <FormInput name="name" label="Nombre" isRequired />
          <FormCheckbox name="anonymous" label="Quiero anonimato para reportar" />
          <FormInput name="email" label="Email de contacto" isRequired type="email"/>
          <FormInput name="contact" label="Otras forma de contacto para ampliar información (celular, otros medios)" />
          <FormSelect name="territory" label="Territorio" isRequired placeholder="Seleccione el territorio" typeEnum={TerritoryTypeEnum} typeLabelEnum={TerritoryTypeLabelEnum}/>
          <FormSelect name="role" label="Cargo" isRequired placeholder="Seleccione el cargo" typeEnum={ChargeTypeEnum} typeLabelEnum={ChargeTypeLabelEnum}/>
          <FormInputNumber name="number" label="Nº" min={1} isRequired />
          <FormInput name="votingList" label="Nombre de Lista" isRequired />
          <FormInput name="politicalParty" label="Partido u Alianza" isRequired />
          <FormSelect onChange={setExpirationType} name="appealExpirationCategory" label="Plazo de impugnación" isRequired placeholder="Seleccione el plazo" typeEnum={AppealExpirationTypeEnum} typeLabelEnum={AppealExpirationTypeLabelEnum}/>
          { expirationType === "FECHA" && <ExpirationDate /> }
          <FormInput name="breach" label="¿Qué no está cumpliendo?" />
          <FormTextArea name="description" label="Comentarios adicionales que quieras compartir" />
          <AttachmentUpload fileList={fileList} setFileList={setFileList}/>
          <Button submit disabled={isSubmitting || hasUploadingFileListItem} children={"Enviar"} />
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};
export default NewIncidentPage;
