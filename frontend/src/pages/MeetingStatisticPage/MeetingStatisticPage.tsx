import { useGetMeetingStatistic } from "@/services/Meetings/Meetings";
import { useParams } from "react-router-dom";

const MeetingStatisticPage = () => {
  const { id } = useParams();
  const { data } = useGetMeetingStatistic(id || "");

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-4 w-[70%] my-auto min-w-[300px]">
        {data?.map(({ question, result }) => (
          <div className="border-gray-300 rounded-xl border-[1px] ">
            <p>Описание вопроса: {question.title}</p>
            <p>Предоставленное решение:{question.description}</p>
            <p className="text-green-500">проголосовало за: {result.agree}</p>
            <p className="text-red-500">
              проголосовало против: {result.disagree}
            </p>
          </div>
        ))}
        <div className="flex flex-col gap-4 w-[70%] my-auto min-w-[300px]"></div>
      </div>
    </div>
  );
};

export default MeetingStatisticPage;
