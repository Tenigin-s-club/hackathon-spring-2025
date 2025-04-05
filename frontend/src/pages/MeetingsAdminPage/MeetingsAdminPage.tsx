import Container from "@/components/ui/container";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import { getMeetings } from "@/services/OfficesOperations/OfficesOperations";
import { Card, CardHeader } from "@/components/ui/card";

const MeetingsAdminPage = () => {
  const [meetingsData, setMeetingsData] = useState<Office[]>([]);

  const updateData = useCallback(async () => {
    getMeetings().then((data) => data && setMeetingsData(data));
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container className="grid grid-cols-3 gap-4">
      {meetingsData.map((el) => (
        <Card>
          <CardHeader>
            {new Date(el.end_datetime).toLocaleDateString()}
          </CardHeader>
        </Card>
      ))}
    </Container>
  );
};

export default MeetingsAdminPage;
