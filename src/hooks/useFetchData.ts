import { useEffect, useContext } from "react";

import { getActivityData } from "../../lib/editorApi";
import { PostContext } from "../components/PostContext";

const useFetchData = () => {
  const { id, setPost, timeSeriesFile } = useContext(PostContext);

  useEffect(() => {
    const getData = async () => {
      const payload = await getActivityData(timeSeriesFile);
      if (!payload) {
        console.log("no data found for post");
        return;
      }
      setPost({
        elevations: payload.elevation,
        activity: payload.activity?.map((item) => ({ ...item })) ?? [],
      });
    };

    getData();
  }, [id, timeSeriesFile]);
};

export default useFetchData;
