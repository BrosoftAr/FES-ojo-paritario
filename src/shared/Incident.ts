import { MongoId } from "./MongoId";

export interface FileListItem {
  uid: string;
  name: string;
  status: "uploading" | "done";
  url: string;
  fileKey: string;
  fileName: string;
}

export type IncidentStatus = "RECEIVED" | "IN_PROGRESS" | "RESOLVED";

export type IncidentForm = {
  name: string;
  anonymous: boolean;
  email: string;
  contact: string;
  territory: string;
  role: string;
  number?: number;
  votingList: string;
  politicalParty: string;
  breach: string;
  description: string;
  attachments: Array<FileListItem>;
}

export interface Incident extends IncidentForm {
  _id: MongoId;
  createdAt: Date;
  status: IncidentStatus;
  appealExpiration: string;
};

export const IncidentStatusEnum = {
  RECEIVED: "RECEIVED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
};

export const IncidentStatusLabel = {
  [IncidentStatusEnum.RECEIVED]: "Recibido",
  [IncidentStatusEnum.IN_PROGRESS]: "En Progreso",
  [IncidentStatusEnum.RESOLVED]: "Resuelto",
};
