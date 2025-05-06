import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssuesStatusBadge } from "./components";
import Link from "next/link";
import { Header } from "@radix-ui/themes/components/table";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assigneToUser: true,
    },
  });
  

  return (
    <Card >
        <Heading size='4' mb='5' >Latest Issues</Heading>
    <Table.Root>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" align="start" gap="2">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <IssuesStatusBadge status={issue.status} />
                </Flex>
                {issue.assigneToUser && (
                    
                  <Avatar src={issue.assigneToUser.image!} fallback="?" size='2'  radius="full"/>
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </Card>
  );
};

export default LatestIssue;
