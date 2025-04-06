import { Button } from "@/components/ui/button";
import { fullDateRuFormat } from "@/lib/helpers/date";
import { useGetMeeting } from "@/services/Meetings/Meetings";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const MeetingPage = () => {
  const { id } = useParams();
  const { data } = useGetMeeting(id || "");
  if (!data) {
    return <div>Не получилось получить данные заседения</div>;
  }
  const nowDate = new Date();
  let status = "active";
  if (
    nowDate < new Date(data.end_datetime) &&
    nowDate > new Date(data.voting_datetime)
  ) {
    status = "active";
  } else if (nowDate > new Date(data.end_datetime)) {
    status = "completed";
  } else {
    status = "future";
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-4 w-[70%] my-auto min-w-[300px]">
        <h2 className="text-3xl font-bold text-center my-4">Заседание №{id}</h2>

        {status === "active" && <Button>ПОДКЛЮЧИТЬ ВКС</Button>}
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
        <p>
          <span className="font-bold">Дата окончания:</span>
          {format(data.end_datetime, fullDateRuFormat)}
        </p>
        <p>
          <span className="font-bold">Всего вопросов:</span>
          {data.questions.length}
        </p>
        {data.questions.map((question) => (
          <div className="border-grey-300 border-[1px] rounded-xl p-4 flex justify-between">
            <p>{question.title}</p>
            <Button>Ответить</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingPage;
