import React from "react";

const Transactions: React.FC = () => {
  return (
    <div className="m-y-5">
      <ProLayuot>
        <ITableHeader
          setForm={(values) => setForm(values)}
          form={form}
          fetchData={fetchData}
          columns={columns}
          name="invoice"
          loading={fetchloading}
        />
        {/* Body */}
        <InvoiceList
          form={form}
          data={columData}
          columns={columns}
          loading={loading}
          run={run}
          count={data?.count}
          begin_date={begin_date}
          end_date={end_date}
          search={search}
        />
      </ProLayuot>
    </div>
  );
};

export default Transactions;
