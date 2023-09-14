import { useEffect, useState } from "react";
import { UsefulInfo } from "..//shared/UsefulInfo";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";

const useUsefulInfoDetail = (usefulInfoId: string) => {
  const [usefulInfo, setUsefulInfo] = useState<UsefulInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsefulInfo = async () => {
    try {
      setIsLoading(true);
      const { usefulInfo } = await FetchService.request(
        ApiEndpoints.USEFUL_INFO_DETAIL,
        {
          body: JSON.stringify({ usefulInfoId }),
        }
      );
      setUsefulInfo(usefulInfo);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsefulInfo();
  }, [usefulInfoId]);

  return { usefulInfo, isLoading };
};
export default useUsefulInfoDetail;
