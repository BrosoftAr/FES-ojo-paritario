import {
  Button as AntButton,
  Form,
  Input,
  message,
  Select,
  Spin,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
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
  IncidentTypeEnum,
  IncidentTypeLabelEnum,
} from "../shared/IncidentsTypes";

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

  console.log("fileList", fileList);
  console.log("hasUploadingFileListItem", hasUploadingFileListItem);

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Nuevo incidente</PageTitle>
        <Form onFinish={submit}>
          <Form.Item
            name="situation"
            label="Situación"
            rules={[{ required: true, message: "Dato requerido" }]}
          >
            <Select placeholder="Seleccione la situación">
              {Object.values(IncidentTypeEnum).map((type) => (
                <Select.Option key={type} value={type}>
                  {IncidentTypeLabelEnum[type]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="Puesto"
            rules={[
              {
                required: true,
                message: "Dato requerido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="place"
            label="Lugar del incidente"
            rules={[
              {
                required: true,
                message: "Dato requerido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción del incidente"
            rules={[
              {
                required: true,
                message: "Dato requerido",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item name="reportedTo" label="Reportado a">
            <TextArea />
          </Form.Item>

          <Form.Item
            name="image"
            label="Agregar imagen"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="images"
              listType="picture"
              fileList={fileList}
              beforeUpload={onUpload}
            >
              <AntButton icon={<UploadOutlined />}>Elegir imagen</AntButton>
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
