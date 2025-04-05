import Loader from "@/components/shared/Loader/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getLevelColor = (num: number) => {
  if (num < 20) return "#12fc68";
  if (num < 50) return "#fca612";
  return "#d91111";
};

const EmployeePage = () => {
  const navigate = useNavigate();
  // const { id = "" } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    fio: string;
    role: string[];
    email: string;
    percentage: number;
    wasOnEvents: Record<string, number>;
  } | null>(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      // get data
      // /user/${id}
      setData({
        fio: "Погосян Роман Тигранович",
        role: ["member_union", "secretar"],
        email: "tgBotyTop228@mail.her",
        percentage: 52.52,
        wasOnEvents: {
          secretar: 2,
          member_union: 14,
        },
      });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full pt-8">
        <Loader />
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-full pt-8 flex-col">
        <h2 className="text-2xl font-medium mb-6">
          Не удалось найти сотрудника!
        </h2>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </div>
    );

  return (
    <Container>
      <h2 className="text-3xl mb-9">Статистика сотрудника:</h2>
      <p className="mb-8 text-xl italic">
        ФИО: <span>{data.fio}</span>
      </p>
      <p className="mb-8 text-2xl items-center gap-3 italic flex">
        Роли:{" "}
        <span className="flex gap-2">
          {data.role.map((el, index) => (
            <Badge key={index} className="text-[18px] py-1 px-5">
              {el}
            </Badge>
          ))}
        </span>
      </p>
      <p className="mb-8 text-xl italic">
        Email:{" "}
        <span>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </span>
      </p>
      <p className="mb-12 text-xl italic">
        Процент пропусков заседаний:{" "}
        <Badge
          className="text-xl"
          style={{ backgroundColor: getLevelColor(data.percentage) }}
        >
          {data.percentage}%
        </Badge>
      </p>
      <div className="border-2 p-6 max-w-[500px] w-full relative">
        <span className="absolute left-5 right-5 text-center align-middle -top-3 bg-white text-2xl">
          Провел заседаний в роли:
        </span>
        {Object.keys(data.wasOnEvents).map((key, index) => (
          <h3 key={index} className="text-3xl font-semibold">
            {key}:{" "}
            <span className="font-light">
              {data.wasOnEvents[key as keyof typeof data.wasOnEvents]}
            </span>
          </h3>
        ))}
      </div>
    </Container>
  );
};

export default EmployeePage;
