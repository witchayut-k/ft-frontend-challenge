"use client";

import { ChildrenType } from "@/core/types";

type Props = ChildrenType & {
  className?: string;
};

const GroupHeader = (props: Props) => {
  const { children, className } = props;
  return (
    <h4
      className={`text-xs font-medium uppercase mb-2 text-slate-600 ${
        className ? className : ""
      }`}
    >
      {children}
    </h4>
  );
};

export default GroupHeader;
