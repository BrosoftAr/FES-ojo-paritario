import {
  Button as AntButton,
  Form,
  message,
  Upload,
} from "antd";
import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { UploadOutlined } from "@ant-design/icons";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";
import FetchService from "../shared/FetchService";
import ApiEndpoints from "../shared/ApiEndpoints";
import { useHistory } from "react-router-dom";
import RoutesEnum from "../shared/RoutesEnum";
import {
  AnonymousTypeEnum,
  AnonymousTypeLabelEnum,
  TerritoryTypeEnum,
  TerritoryTypeLabelEnum,
  ChargeTypeEnum,
  ChargeTypeLabelEnum,
} from "../shared/IncidentsTypes";
import FormInput from "../components/Form/Input";
import FormSelect from "../components/Form/Select";
import FormTextArea from "../components/Form/TextArea";

interface FormValues {
  situation: string;
  role: string;
  place: string;
  description: string;
  image: string;
  reportedTo: string;
}

interface FileListItem {
  uid: string;
  name: string;
  status: "uploading" | "done";
  url: string;
  fileKey: string;
}

const NewIncidentPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const submit = async (formValues: FormValues) => {
    const closeLoading = message.loading("Enviando incidente...");
    try {
      setIsSubmitting(true);
      const { description, image, place, role, situation, reportedTo } =
        formValues;

      await FetchService.request(ApiEndpoints.INCIDENT_ADD, {
        body: JSON.stringify({
          description,
          images: fileList.map((file) => ({
            fileName: file.name,
            fileKey: file.fileKey,
          })),
          place,
          role,
          situation,
          reportedTo,
        }),
      });
      setIsSubmitting(false);
      closeLoading();
      message.success("Incidente enviado!", 2);
      history.push(RoutesEnum.INCIDENTS);
    } catch (e) {
      console.log(e);
      message.error(e.message || "Error al enviar el incidente");
    } finally {
      setIsSubmitting(false);
      closeLoading();
    }
  };

  const getImageToken = async (fileName) => {
    const response = await FetchService.request(
      ApiEndpoints.GET_IMAGE_UPLOAD_TOKEN,
      {
        body: JSON.stringify({
          fileName,
        }),
      }
    );
    return response;
  };

  const onUpload = async (file) => {
    const fileName: string = file.name;

    const newFile: FileListItem = {
      uid: fileName,
      name: fileName,
      status: "uploading",
      url: "",
      fileKey: "",
    };

    setFileList([...fileList, newFile]);

    console.log("file", file);
    const { url, fields } = await getImageToken(fileName);
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
      const fileKey = fields.key;

      newFile.status = "done";
      newFile.url = `${url}${fileKey}`;
      newFile.fileKey = fileKey;

      setFileList([...fileList, newFile]);
    } else {
      console.error("Upload failed.");
      message.error(
        "Hubo un problema con la carga del archivo. Intente nuevamente. "
      );
      setFileList([...fileList]);
    }

    return false;
  };

  const hasUploadingFileListItem = !!fileList.find(
    (fileListItem) => fileListItem.status === "uploading"
  );

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Nuevo incidente</PageTitle>
        <Form onFinish={submit}>
          <FormInput name="name" label="Nombre" isRequired />
          <FormSelect name="anonymous" label="Quiero anonimato para reportar" isRequired typeEnum={AnonymousTypeEnum} typeLabelEnum={AnonymousTypeLabelEnum}/>
          <FormInput name="email" label="Email de contacto" isRequired type="email"/>
          <FormInput name="contact" label="Otras forma de contacto para ampliar información (celular, otros medios)" />
          <FormSelect name="territory" label="Territorio" isRequired placeholder="Seleccione el territorio" typeEnum={TerritoryTypeEnum} typeLabelEnum={TerritoryTypeLabelEnum}/>
          <FormSelect name="charge" label="Cargo" isRequired placeholder="Seleccione el cargo" typeEnum={ChargeTypeEnum} typeLabelEnum={ChargeTypeLabelEnum}/>
          <FormInput name="number" label="Nº" type="number" isRequired />
          <FormInput name="listName" label="Nombre de Lista" isRequired />
          <FormInput name="party" label="Partido u Alianza" isRequired />
          
          <FormInput name="breach" label="¿Qué no está cumpliendo?" />
          <FormTextArea name="comments" label="Comentarios adicionales que quieras compartir" />

          <Form.Item
            name="attachments"
            label="Materiales para reportar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="images"
              listType="picture"
              fileList={fileList}
              beforeUpload={onUpload}
            >
              <AntButton icon={<UploadOutlined />}>Elegir adjuntos</AntButton>
            </Upload>
            {hasUploadingFileListItem && <span />}
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting || hasUploadingFileListItem}
          >
            Enviar
          </Button>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};
export default NewIncidentPage;
