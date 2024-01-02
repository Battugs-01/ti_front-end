import { Dashboard } from "./dashboard";
import { Form } from "./form";
import { ListStatement } from "./list";
import { PageHeader } from "components/page_header";
const StatementPage = () => {
  return (
    <div className="space-y-3">
      <Form />
      <Dashboard />
      <ListStatement />
    </div>
  );
};

export default StatementPage;
