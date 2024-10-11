"use client";

import BaseEntity from "@/types/entity/BaseEntity";
import { CustomFlowbiteTheme, Table } from "flowbite-react";
import TableSketon from "./TableSkeleton";
import { Row } from "./Row";

export default function DataTable<T extends Object & BaseEntity>({
  data,
//   entityType,
  isLoading = false,
  pick,
  className,
  isEdit = true,
  onEdit,
  onDelete,
  onClickRow = () => {},
  ...props
}: PropTypes<T>) {
  return (
    <div
      className={`overflow-auto flex-1 max-w-full h-fit max-h-full rounded-lg border-[1px] border-secondary-200 ${className}`}
      {...props}
    >
      {isLoading ? (
        <TableSketon col={Object.keys(pick).length} />
      ) : (
        <Table theme={tableTheme} hoverable>
          <Table.Head theme={tableTheme?.head}>
            <Table.HeadCell theme={tableTheme?.head?.cell} className={` w-10`}>
              STT
            </Table.HeadCell>
            {Object.values<Column<any>>(pick).map((column) => (
              <Table.HeadCell theme={tableTheme?.head?.cell} key={column.title}>
                {column.title}
              </Table.HeadCell>
            ))}
            {isEdit && (
              <Table.HeadCell
                theme={tableTheme?.head?.cell}
                className={` w-10`}
              >
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((row, index) => (
              <Row
                key={index}
                // entityType={entityType}
                row={row}
                isEdit={isEdit}
                index={index}
                pick={pick}
                onClickRow={onClickRow}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "min-w-full text-left rounded-lg text-sm text-secondary-500",
    shadow:
      "absolute bg-background-secondary dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative ",
  },
  body: {
    base: "group/body bg-background-secondary",
    cell: {
      base: ` group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg p-2 sm:p-3 md:p-4 font-normal text-secondary-900 `,
    },
  },
  head: {
    base: "group/head bg-background-secondary text-xs border-b-2 border-secondary-200 uppercase text-secondary-700",
    cell: {
      base: "  group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg p-2 sm:p-3 md:p-4 sm:p-2 md:p-4",
    },
  },
  row: {
    base: "group/row bg-background-secondary",
    hovered: "hover:bg-primary-100",
    striped: "odd:bg-background-secondary even:bg-background-secondary ",
  },
};

type PropTypes<T> = {
  data: [];
//   entityType?: EntityType;
  isLoading?: boolean;
  onEdit?: (product: T) => any;
  onDelete?: (product: T) => any;
  onClickRow?: (product: T) => any;
  pick: { [key in keyof Partial<T>]: Column<T[key]> };
  isEdit?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export type Column<T> = {
  title?: string;
  size?: number;
  className?: string;
  mapper?: (value: T) => any;
  editable?: boolean;
};
