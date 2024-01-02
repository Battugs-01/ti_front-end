import { Form } from "./form";
import { Statistics } from "./list";

type Props = {
  id: number;
};
export const CompanyDashboard = ({ id }: Props) => {
  return (
    <>
      <Form />
      <Statistics serviceId={id} />
    </>
  );
};
