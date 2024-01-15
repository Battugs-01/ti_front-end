import { FC, useState } from "react";
import CardList from "./cardList";
import { FilterForm } from "components/filter";
import { CustomButton } from "../components/button";
import PlusIcon from "assets/government/icons/plus.svg";
import { CreateOrphan } from "./action/createOrphan";

const data = [
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 12,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 23,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 13,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 12,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 15,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 45,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 8,
    plan: 16,
    bedNumber: 65,
    bedNumberMax: 70,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 34,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 23,
    plan: 16,
    bedNumber: 80,
    bedNumberMax: 85,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 67,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 90,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 89,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 98,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 97,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 76,
    name: "Davaatulga",
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 9,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 99,
    name: "Davaatulga",
  },
];

const OrphanPage: FC = () => {
  const [modalOpen, isModalOpen] = useState<boolean>(false);
  const cancelModal = () => {
    isModalOpen(false);
  };
  return (
    <div>
      <div className="mb-6">
        <FilterForm
          isSearch
          customState={
            <CustomButton
              icon={<img src={PlusIcon} />}
              title="Нэмэх"
              onClick={() => isModalOpen(true)}
            />
          }
        />
      </div>
      <CardList data={data} />
      <CreateOrphan openModal={modalOpen} cancelModal={cancelModal} />
    </div>
  );
};

export default OrphanPage;
