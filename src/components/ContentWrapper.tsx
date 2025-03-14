import { ChildrenType } from "@/core/types";

type Props = ChildrenType & {
  className?: string;
};

const ContentWrapper = (props: Props) => {
  const { children, className } = props;
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
