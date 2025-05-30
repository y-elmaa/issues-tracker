import React from "react";
import IssuesAction from "./IssuesAction";
import { Table } from "@radix-ui/themes";

import {Skeleton} from '@/app/components';


const loading = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssuesAction />
      <Table.Root variant="surface"> 
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Date
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block sm:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loading;
