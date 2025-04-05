import Title from "@/components/ui/title";

import { useCallback, useEffect } from "react";

const MainPage = () => {
  const updateData = useCallback(async () => {}, []);

  useEffect(() => {
    // updateData();
  }, [updateData]);
  return (
    <div>
      <div className="w-full flex items-center justify-between max-sm:block">
        <Title size="md" text="Заседания" />
      </div>

      <div className="w-full flex items-center flex-col gap-8 mt-40">
        <Title size="md" text={"У вас нет офисов"} />
      </div>
    </div>
  );
};

export default MainPage;
