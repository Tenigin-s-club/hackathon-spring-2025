import { Button } from "@/components/ui/button";
import { fullDateRuFormat } from "@/lib/helpers/date";
import { useGetMeting } from "@/services/Meetings/Meetings";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const MeetingPage = () => {
  const { id } = useParams();
  const { data } = useGetMeting(id || "");
  if (!data) {
    return <div>Не получилось получить данные заседения</div>;
  }
  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">Заседание №{id}</h2>
      <p>
        <span className="font-bold">Место:</span> {data.place}
      </p>
      <p>
        <span className="font-bold">Формат:</span>
        {data.is_internal ? "очно" : "очно-заочное"}
      </p>
      <p>
        <span className="font-bold">Дата начала:</span>
        {format(data.voting_datetime, fullDateRuFormat)}
      </p>
      {status === "completed" && (
        <p>
          <span className="font-bold">Дата окончания:</span>
          {format(data.end_datetime, fullDateRuFormat)}
        </p>
      )}
      <div className="mt-2 flex w-full justify-end">
        {status === "active" && <Button>Войти</Button>}
        {status === "future" && <Button variant="ghost">Скоро</Button>}
        {status === "completed" && (
          <Button variant="secondary">Просмотр</Button>
        )}
      </div>
    </div>
  );
};

export default MeetingPage;
