import Container from "@/components/ui/container";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMeetings } from "@/services/Meetings/Meetings";
import { useState } from "react";
import { MeetingStatus } from "@/services/Meetings/types";

import MeetingCard from "@/components/shared/MeetingCard";
import Loader from "@/components/shared/Loader/Loader";

const MeetingsAdminPage = () => {
  const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>("active");
  const { data, isLoading } = useGetMeetings(meetingStatus || "active");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Button className="mb-6" onClick={() => navigate("/meetings/create")}>
        Создать заседание
      </Button>
      <Tabs defaultValue={meetingStatus} className="w-full">
        <TabsList className="grid max-w-[600px] grid-cols-3 ">
          <TabsTrigger
            onClick={() => setMeetingStatus("active")}
            value="active"
          >
            Активные
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setMeetingStatus("future")}
            value="future"
          >
            Предстоящие
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setMeetingStatus("completed")}
            value="completed"
          >
            Предыдущие
          </TabsTrigger>
        </TabsList>
        <TabsContent value={meetingStatus}>
          <ul className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 ">
            {data?.map((el) => (
              <MeetingCard status={meetingStatus} {...el} />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default MeetingsAdminPage;
