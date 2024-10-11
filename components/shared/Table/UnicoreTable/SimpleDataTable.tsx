"use client";

import { Table } from "flowbite-react";
import Image from "next/image";
import MoreButtonComponent from "./MoreButtonComponent";
import { TableDataMoreComponentItems } from "@/constants";
import { useState } from "react";
import InputComponent from "./InputComponent";

const mockData = [
  { id: 1, name: "Product 1", category: "Category 1", price: 10 },
  { id: 2, name: "Product 2", category: "Category 2", price: 20 },
  { id: 3, name: "Product 3", category: "Category 3", price: 30 },
];

export default function SimpleDataTable() {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="overflow-auto max-w-full h-fit rounded-lg border-[1px] border-secondary-200">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {mockData.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>
                <MoreButtonComponent handleEdit={handleEdit} />
              </Table.Cell>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell>
              
              </Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
