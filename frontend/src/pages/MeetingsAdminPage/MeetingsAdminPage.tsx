import Container from "@/components/ui/container";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import { getMeetings } from "@/services/OfficesOperations/OfficesOperations";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MeetingsAdminPage = () => {
  const [meetingsData, setMeetingsData] = useState<Office[]>([]);
  const navigate = useNavigate();
  const updateData = useCallback(async () => {
    getMeetings().then((data) => data && setMeetingsData(data));
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container>
      <Button className="mb-6" onClick={() => navigate("/meetings/create")}>
        Создать заседание
      </Button>
      <ul className="grid grid-cols-3 gap-4">
        {meetingsData.map((el) => (
          <Card>
            <CardHeader>
              {new Date(el.end_datetime).toLocaleDateString()}
            </CardHeader>
          </Card>
        ))}
      </ul>
    </Container>
  );
};

export default MeetingsAdminPage;
