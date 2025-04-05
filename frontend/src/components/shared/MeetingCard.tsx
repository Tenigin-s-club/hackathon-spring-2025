import { Meeting, MeetingStatus } from "@/services/Meetings/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { fullDateRuFormat } from "@/lib/helpers/date";

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
  return (
    <Card>
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
            <Button variant="secondary">Просмотр</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default MeetingCard;
