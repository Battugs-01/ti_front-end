import React from "react";
import { Pagination } from "antd";

type PaginationType = {
  total?: number;
};

const CustomPagination: React.FC<PaginationType> = ({ total }) => (
  <>
    <div className="mt-5">
      <Pagination
        total={total}
        showTotal={(total, range) => (
          <div className="font-semibold text-gray-500">
            {range[0]}-{range[1]} of {total} items
          </div>
        )}
        defaultPageSize={10}
        defaultCurrent={1}
        pageSizeOptions={[10, 20, 50, 100, 200, 500]}
        responsive
        size="small"
      />
    </div>
  </>
);

export default CustomPagination;
