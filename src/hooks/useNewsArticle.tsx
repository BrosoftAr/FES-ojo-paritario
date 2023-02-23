import { useEffect, useState, useCallback } from "react";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";
import { NewsArticle } from "../shared/NewsArticle";

const useNewsArticle = (id: string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticle = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle, id]);

  return { article, isLoading };
};
export default useNewsArticle;
