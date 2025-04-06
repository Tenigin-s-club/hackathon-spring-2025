import { Meeting, MeetingStatus } from "@/services/Meetings/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { fullDateRuFormat } from "@/lib/helpers/date";
import { useNavigate } from "react-router-dom";

interface Props extends Meeting {
  status: MeetingStatus;
}

const MeetingCard = ({
  id,
  place,
  is_internal,
  status,
  voting_datetime,
  end_datetime,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className="cursor-pointer hover:scale-[102%] hover:shadow-md"
      onClick={() => navigate(`/meeting/${id}`)}
    >
      <CardHeader>
        <CardTitle>Заседание №: {id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Место:</span> {place}
        </p>
        <p>
          <span className="font-bold">Формат:</span>{" "}
          {is_internal ? "очно" : "очно-заочное"}
        </p>
        <p>
          <span className="font-bold">Дата начала:</span>{" "}
          {format(voting_datetime, fullDateRuFormat)}
        </p>
        {status === "completed" && (
          <p>
            <span className="font-bold">Дата окончания:</span>{" "}
            {format(end_datetime, fullDateRuFormat)}
          </p>
        )}
        <div className="mt-2 flex w-full justify-end">
          {status === "active" && <Button>Войти</Button>}
          {status === "future" && <Button variant="ghost">Скоро</Button>}
          {status === "completed" && (
            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/meetingstatistic/${id}`);
                }}
              >
                Статистика
              </Button>
              <Button variant="secondary">Просмотр</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default MeetingCard;
