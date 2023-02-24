export const TerritoryTypeEnum = {
  NACIONAL: "NACIONAL",
  PROVINCIAL: "PROVINCIAL",
  MUNICIPAL: "MUNICIPAL",
};

export const ChargeTypeEnum = {
  DIPUTADX: "DIPUTADX",
  SENADORX: "SENADORX",
  CONCEJAL: "CONCEJAL",
};

export const AppealExpirationTypeEnum = {
  VENCIDO: "VENCIDO",
  DESCONOCIDO: "DESCONOCIDO",
  FECHA: "FECHA",
};

export const TerritoryTypeLabelEnum = {
  [TerritoryTypeEnum.NACIONAL]: "Nacional",
  [TerritoryTypeEnum.PROVINCIAL]: "Provincial",
  [TerritoryTypeEnum.MUNICIPAL]: "Municipal"
};

export const ChargeTypeLabelEnum = {
  [ChargeTypeEnum.DIPUTADX]: "Diputadx",
  [ChargeTypeEnum.SENADORX]: "Senadorx",
  [ChargeTypeEnum.CONCEJAL]: "Concejal"
};

export const AppealExpirationTypeLabelEnum = {
  [AppealExpirationTypeEnum.VENCIDO]: "Vencido",
  [AppealExpirationTypeEnum.DESCONOCIDO]: "Desconocido",
  [AppealExpirationTypeEnum.FECHA]: "Insertar fecha"
};
