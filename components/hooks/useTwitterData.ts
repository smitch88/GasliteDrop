import { useState, useEffect } from "react";
import { useDebouncedCallback } from "@react-hookz/web";

const useTwitterData = ({ tweetId }) => {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

  const fetchData = useDebouncedCallback(
    async (id) => {
      try {
        setIsLoading(true);
        setError(null);
        const { addresses, tweet, error } = await fetch(
          `/api/tweet?id=${id}`
        ).then((res) => res.json());
        if (error) {
          throw new Error(error);
        }
        setData({
          addresses,
          tweet,
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [tweetId],
    1000
  );

  useEffect(() => {
    if (tweetId) {
      fetchData(tweetId);
    } else {
      setData(null);
    }
  }, [tweetId]);
  return { data, error, isLoading };
};

export default useTwitterData;
