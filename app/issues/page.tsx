import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import React from "react";
import IssuesStatusBadge from "../components/IssuesStatusBadge";
import IssuesAction from "./IssuesAction";

const IssuesPage = async () => {
  const issues = await prisma.issus.findMany();

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
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block sm:hidden">
                  <IssuesStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <IssuesStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
