import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetQuestion } from "@/services/Meetings/Meetings";
import { useState } from "react";
import { useParams } from "react-router-dom";

type decisionType = "for" | "against" | "abstain";
const QuestionPage = () => {
  const [decision, setDecision] = useState<decisionType>();
  const { id } = useParams();
  const { data } = useGetQuestion(id || "");

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-4 w-[70%] my-auto min-w-[300px]">
        <h2 className="text-3xl font-bold text-center my-4">
          Описание вопроса: {data?.title}
        </h2>

        <p>
          <span className="font-bold">Предоставленное решение:</span>
          {data?.description}
        </p>
        {data?.materials.map((material, id) => (
          <a className="text-blue-500" href={material}>
            ссылка на ресурс №{id}
          </a>
        ))}
        <div className="my-4 flex flex-col gap-6">
          <div
            className="cursor-pointer flex items-center space-x-4"
            onClick={() => setDecision("for")}
          >
            <Checkbox
              checked={decision === "for"}
              id="for"
              className="border-green-500 scale-[200%] data-[state=checked]:bg-green-500"
            />
            <label
              htmlFor="for"
              className="cursor-pointer w-full text-2xl text-green-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              За
            </label>
          </div>
          <div
            className="cursor-pointer text-red-500 flex items-center space-x-4 "
            onClick={() => setDecision("against")}
          >
            <Checkbox
              checked={decision === "against"}
              id="against"
              className="border-red-500 scale-[200%] data-[state=checked]:bg-red-500"
            />
            <label
              htmlFor="against"
              className="cursor-pointer w-full text-2xl text-red-500  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Против
            </label>
          </div>
          <div
            className="cursor-pointer flex items-center space-x-4 "
            onClick={() => setDecision("abstain")}
          >
            <Checkbox
              checked={decision === "abstain"}
              id="abstain"
              className="border-gray-500 scale-[200%] data-[state=checked]:bg-gray-500"
            />
            <label
              htmlFor="abstain"
              className="cursor-pointer w-full text-2xl text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Воздержусь от ответа
            </label>
          </div>
        </div>
        <Button className="w-[50%] mx-auto mt-6">ПОДТВЕРДИТЬ</Button>
      </div>
    </div>
  );
};

export default QuestionPage;
