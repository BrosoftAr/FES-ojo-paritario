import { useEffect, useState, useCallback } from "react";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";
import { Incident } from "../shared/Incident";

const useIncidents = ({ limit = 0 }: { limit?: number | null }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIncidents = useCallback(async () => {
    try {
      setIsLoading(true);
      const { incidents } = await FetchService.request(
        ApiEndpoints.INCIDENT_LIST,
        { body: JSON.stringify({ limit }) }
      );
      setIncidents(incidents);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return {
    incidents,
    isLoading,
    fetchIncidents,
  };
};
export default useIncidents;
