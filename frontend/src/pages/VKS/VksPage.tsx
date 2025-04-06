import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const callId = "hFpHAbftLPIH";

const callType = "default";
const user_id = "Zam_Wesell";

const user = { id: user_id, name: "CodeSandbox User" };
const apiKey = "mmhfdzb5evj2";

const tokenProvider = async () => {
  const res = await fetch(
    "https://pronto.getstream.io/api/auth/create-token?" +
      new URLSearchParams({ api_key: apiKey, user_id })
  ).then((r) => r.json());

  return res.token;
};

export default function VksPage() {
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, []);

  useEffect(() => {
    if (!client) return;
    const myCall = client.call(callType, callId);
    myCall.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
    };
  }, [client]);

  if (!client || !call) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme className="my-theme-overrides">
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
