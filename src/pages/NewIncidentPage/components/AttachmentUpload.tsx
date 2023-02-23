import {
  Button as AntButton,
  Form,
  message,
  Upload,
} from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import FetchService from "../../../shared/FetchService";
import ApiEndpoints from "../../../shared/ApiEndpoints";

interface FileListItem {
  uid: string;
  name: string;
  status: "uploading" | "done";
  url: string;
  fileKey: string;
}

interface AttachmentUploadProps {
  fileList: Array<FileListItem>;
  setFileList: (fileList: Array<FileListItem>) => void;
}

const AttachmentUpload: React.FC<AttachmentUploadProps> = ({fileList, setFileList}) => {

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const getImageToken = async (fileName) => {
    const body = JSON.stringify({ fileName });
    const response = await FetchService.request(
      ApiEndpoints.GET_IMAGE_UPLOAD_TOKEN, { body }
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
      const fileKey = fields.key;

      newFile.status = "done";
      newFile.url = `${url}${fileKey}`;
      newFile.fileKey = fileKey;

      setFileList([...fileList, newFile]);
    } else {
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
    <Form.Item
      name="attachments"
      label="Materiales para reportar (fotos, docs, attachment)"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        listType="picture"
        fileList={fileList}
        beforeUpload={onUpload}
      >
        <AntButton icon={<UploadOutlined />} children="Elegir adjuntos" />
      </Upload>
      {hasUploadingFileListItem && <span />}
    </Form.Item>
  );
};
export default AttachmentUpload;
