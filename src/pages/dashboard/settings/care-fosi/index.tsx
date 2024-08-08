import { Flex } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import Functional from "./functional";
import PsychoEmotional from "./psycho-emotional";
import SociaEconomic from "./socia-economic";
import Clinical from "./clinical";

const CareFosi: React.FC = () => {
  return (
    <Flex vertical gap="large">
      <Functional />
      <PsychoEmotional />
      <SociaEconomic />
      <Clinical />
    </Flex>
  );
};

export default CareFosi;
