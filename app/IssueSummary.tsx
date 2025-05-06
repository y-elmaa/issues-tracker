import React from "react";
import { Status } from "./generated/prisma";
import { Flex } from "@radix-ui/themes/components/flex";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";
interface Props {
  Open: number;
  InProgress: number;
  Closed: number;
}

const IssueSummary = ({ Open, InProgress, Closed }: Props) => {
  const contaners: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issue", value: Open, status: "OPEN" },
    { label: "InProgress Issue", value: InProgress, status: "IN_PROGRESS" },
    { label: "Closed Issue", value: Closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {contaners.map((contaner) => (
        <Card key={contaner.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues?status=${contaner.status}`}
              className="font-medium"
            >
              {" "}
              {contaner.label}
            </Link>
            <Text size="5" className="font-bold">
              {contaner.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
