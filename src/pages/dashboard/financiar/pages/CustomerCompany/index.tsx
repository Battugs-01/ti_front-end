import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import InitTableHeader from "components/table-header";
import { useState } from "react";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { CreateService } from "./actions/create";
import { UpdateCustomerCompany } from "./actions/update";
import CustomerCompanyView from "pages/domain/customer_company/view";
import { getCustomerCompanyColumns } from "./components";
import { BUTTON_TEXTS, EXPORT_FILENAME, MODAL_TITLES, SEARCH_PLACEHOLDER } from "./constants";
import { useCustomerCompanyData } from "./hooks";

/**
 * CustomerCompany component displays a list of customer companies
 * with options to create, view, and update them
 */
const CustomerCompany = () => {
  const [create, setCreate] = useState<boolean>(false);
  
  const { 
    filter, 
    setFilter, 
    search, 
    list, 
    handleSearch, 
    handleRefresh 
  } = useCustomerCompanyData();

  return (
    <PageCard xR>
      <div className="px-2 pb-0">
        <InitTableHeader
          addButtonName={BUTTON_TEXTS.ADD}
          customHeaderTitle={<Label title={MODAL_TITLES.VIEW} />}
          searchPlaceHolder={SEARCH_PLACEHOLDER}
          fileName={EXPORT_FILENAME}
          setCreate={setCreate}
          search={search}
          setSearch={handleSearch}
          refresh={handleRefresh}
        />
      </div>

      <ITable<CustomerCompanyType>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        DetailComponent={CustomerCompanyView}
        form={filter}
        setForm={setFilter}
        columns={getCustomerCompanyColumns()}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
      />
    </PageCard>
  );
};

export default CustomerCompany;
