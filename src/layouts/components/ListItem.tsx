"use client";

import { ChildrenType } from "@/core/types";

type Props = ChildrenType & {
  className?: string;
};

const ListItem = (props: Props) => {
  const { children, className } = props;
  return (
    <div
      className={`text-xs mb-1 text-slate-600 flex justify-around items-start w-full ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ListItem;
