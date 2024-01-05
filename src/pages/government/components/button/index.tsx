import { Button, ButtonProps, Tooltip } from "antd";

export const CustomButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        type="primary"
        className=" flex gap-1 items-center font-medium px-3 py-2"
      >
        {rest?.title}
      </Button>
    </Tooltip>
  );
};
