import { useEffect, useState } from "react";
import { NewsArticle } from "../shared/NewsArticle";
import FetchService from "../shared/FetchService";
import ApiEndpoints from "../shared/ApiEndpoints";

const useNewsArticles = ({ limit = 0 }: { limit?: number }) => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewsArticles = async () => {
    try {
      setIsLoading(true);
      const { news } = await FetchService.request(ApiEndpoints.NEWS_LIST, {
        body: JSON.stringify({ limit }),
      });
      setNewsArticles(news);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  return {
    newsArticles,
    isLoading,
    fetchNewsArticles,
  };
};
export default useNewsArticles;
