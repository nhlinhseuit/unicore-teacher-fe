"use client";

import { Table } from "flowbite-react";
import StringSkeleteton from "./StringSkeleton";
import React from "react";

export default function TableSkeleton() {
  return (
    <div className="overflow-auto max-w-full h-fit mt-4 mb-4 rounded-lg border-[1px] border-secondary-200  overflow-x-hidden">
      <Table hoverable>
        {/* HEADER */}
        <Table.Head className="bg-[#F9F9FB] border-b uppercase">
          <Table.HeadCell className={` w-10 border-r-[1px] uppercase`}>
          </Table.HeadCell>

          {Array.from({ length: 5 }).map((_, index) => (
            <Table.HeadCell
              key={index}
              className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
            >
            </Table.HeadCell>
          ))}
        </Table.Head>

        {/* BODY */}
        <Table.Body className="divide-y text-left">
          {Array.from({ length: 5 }).map((_, index) => (
            <Table.Row
              key={index}
              className={`bg-background-secondary  text-left duration-100`}
            >
              <Table.Cell className="w-10 border-r-[1px]  text-left">
                <StringSkeleteton from={40} to={40} className="w-full" />
              </Table.Cell>

              {Array.from({ length: 5 }).map((_, colIndex) => (
                <Table.Cell key={colIndex} className="border-r-[1px]">
                  <StringSkeleteton from={80} to={120} className="w-full" />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
