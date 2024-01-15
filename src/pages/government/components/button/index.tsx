import { Button, ButtonProps, Tooltip } from "antd";

export const CustomButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        type="primary"
        className="flex items-center font-medium p-4"
      >
        {rest?.title}
      </Button>
    </Tooltip>
  );
};

export const DefaultButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        type="default"
        className=" flex gap-1 items-center font-medium px-3 py-2"
      >
        {rest?.title}
      </Button>
    </Tooltip>
  );
};
