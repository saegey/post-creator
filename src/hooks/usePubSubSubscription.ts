import { useState, useEffect, useRef } from "react";
import { PubSub } from "aws-amplify";
import {
  getEndpoint,
  attachIoTPolicyToUser,
  configurePubSub,
} from "../actions/PubSub";

const usePubSubSubscription = (
  postId: string,
  handlePhase: (phase: string) => void
) => {
  const [subPubConfigured, setSubPubConfigured] = useState(false);
  const subRef = useRef<any>(null);

  useEffect(() => {
    const setUpSub = async () => {
      if (!subPubConfigured) {
        const endpoint = await getEndpoint();
        await configurePubSub(endpoint);
        await attachIoTPolicyToUser();
        setSubPubConfigured(true);
        console.log("subPubConfigured:", subPubConfigured);
      }

      if (subRef.current) {
        console.log("unsubscribing");
        // If a subscription already exists, unsubscribe first
        subRef.current.unsubscribe();
        subRef.current = null;
      }

      subRef.current = PubSub.subscribe(`post-${postId}`).subscribe({
        next: (data: any) => {
          console.log("data:", data.value);
          handlePhase(data.value.phase as string);
        },
        error: (error) => console.error(error),
      });
    };

    setUpSub();

    return () => {
      if (subRef.current) {
        subRef.current.unsubscribe();
        subRef.current = null;
      }
    };
  }, [postId]);
};

export default usePubSubSubscription;
