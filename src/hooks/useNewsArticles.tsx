import { useEffect, useState, useCallback } from "react";
import { NewsArticle } from "../shared/NewsArticle";
import FetchService from "../shared/FetchService";
import ApiEndpoints from "../shared/ApiEndpoints";

const useNewsArticles = ({ scope, limit = 0 }: { scope: string, limit?: number }) => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewsArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const { news } = await FetchService.request(ApiEndpoints.NEWS_LIST, {
        body: JSON.stringify({ limit }),
      });
      if (scope) setNewsArticles(news.filter((article: NewsArticle) => article.scope === scope));
      else setNewsArticles(news);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  },[scope, limit]);

  useEffect(() => {
    fetchNewsArticles();
  }, [fetchNewsArticles]);

  return {
    newsArticles,
    isLoading,
    fetchNewsArticles,
  };
};
export default useNewsArticles;
