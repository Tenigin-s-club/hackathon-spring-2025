import Container from "@/components/ui/container";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMeetings } from "@/services/Meetings/Meetings";
import { useState } from "react";
import { MeetingStatus } from "@/services/Meetings/types";
import { Loader } from "lucide-react";

const MeetingsAdminPage = () => {
  const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>("active");
  const { data, isLoading } = useGetMeetings(meetingStatus || "active");
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Button className="mb-6" onClick={() => navigate("/meetings/create")}>
        Создать заседание
      </Button>
      <Tabs defaultValue="account" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
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
          <ul className="grid grid-cols-3 gap-4">
            {data?.map((el) => (
              <Card>
                <CardHeader>
                  {new Date(el.end_datetime).toLocaleDateString()}
                </CardHeader>
              </Card>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default MeetingsAdminPage;
