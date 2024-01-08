import React from "react";
import { Pagination } from "antd";

const CustomPagination: React.FC = () => (
  <>
    <div
      className="mt-5"
      style={{
        position: "absolute",
        right: 10,
        bottom: 5,
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <Pagination
        total={85}
        showTotal={(total, range) => (
          <div className="font-semibold text-gray-500">
            {range[0]}-{range[1]} of {total} items
          </div>
        )}
        defaultPageSize={20}
        defaultCurrent={1}
        pageSizeOptions={[20, 50, 100, 200, 500]}
        responsive
        size="small"
      />
    </div>
  </>
);

export default CustomPagination;
