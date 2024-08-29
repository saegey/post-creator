import { useEffect, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";

import * as subscriptions from "../graphql/subscriptions";
import { PostContext } from "../components/PostContext";
import { OnUpdatePostSubscription } from "../API";

const usePostSubscription = () => {
  // const { setPost, setIsFtpUpdating } = useContext(PostContext);
  const { setPost } = useContext(PostContext);

  useEffect(() => {
    const subscription = API.graphql<
      GraphQLSubscription<OnUpdatePostSubscription>
    >(graphqlOperation(subscriptions.onUpdatePost)).subscribe({
      next: ({
        value,
      }: {
        value: { data: GraphQLSubscription<OnUpdatePostSubscription> };
      }) => {
        if (
          !value.data?.onUpdatePost?.powerZoneBuckets ||
          !value.data?.onUpdatePost?.timeInRed ||
          !value.data?.onUpdatePost?.powerZones
        ) {
          return;
        }
        const { timeInRed, powerZoneBuckets, powerZones } =
          value.data.onUpdatePost;
        setPost({
          timeInRed,
          powerZoneBuckets: JSON.parse(powerZoneBuckets),
          powerZones: JSON.parse(powerZones),
        });
        // setIsFtpUpdating(false);
      },
      error: (error: Error) => console.warn(error),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

export default usePostSubscription;
