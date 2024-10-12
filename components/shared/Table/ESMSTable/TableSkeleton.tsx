"use client";

import { Table } from "flowbite-react";
import StringSkeleteton from "./StringSkeleton";
// import useClient from "@/hooks/useClient";

export default function TableSketon({
  lines = 3,
  col = 5,
}: {
  lines?: number;
  col?: number;
}) {
  // const isClient = useClient();
  const isClient = true;
  const cols = Array(col)
    .fill(0)
    .map((_, i) => ({ key: i, label: i }));
  const rows = Array(lines)
    .fill(0)
    .map((_, i) => ({ key: i }));

  return (
    isClient && (
      <Table className="w-full" theme={{ root: { base: "w-full" } }}>
        {/* <Table.Head>
                    {cols.map((v) => (
                        <Table.Cell key={v.key}></Table.Cell>
                    ))}
                </Table.Head> */}
        <Table.Body>
          {rows.map((item) => (
            <Table.Row key={item.key}>
              <Table.Cell>
                <StringSkeleteton from={40} to={40} className="w-10" />
              </Table.Cell>
              <Table.Cell>
                <StringSkeleteton from={100} to={300} className="w-[300px]" />
              </Table.Cell>
              {Array(col - 1)
                .fill("")
                .map((_, index) => (
                  <Table.Cell key={index}>
                    <StringSkeleteton
                      from={100}
                      to={100}
                      className="w-[100px]"
                    />
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  );
}
