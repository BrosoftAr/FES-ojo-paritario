import { useEffect, useState } from "react";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";
import { NewsArticle } from "../shared/NewsArticle";

const useNewsArticle = (id: string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      const { news } = await FetchService.request(ApiEndpoints.NEWS_DETAIL, {
        body: JSON.stringify({ newsId: id }),
      });
      setArticle(news);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  return { article, isLoading };
};
export default useNewsArticle;
