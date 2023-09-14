import { MongoId } from "./MongoId";

export type IncidentStatus = "RECEIVED" | "IN_PROGRESS" | "RESOLVED";

export type Incident = {
  _id: MongoId;
  createdAt: Date;

  situation: string;
  role: string;
  company: string;
  place: string;
  description: string;
  reportedTo: string;
  images: {
    url: string;
    fileName: string;
  }[];
  status: IncidentStatus;
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
