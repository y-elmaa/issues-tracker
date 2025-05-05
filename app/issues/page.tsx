import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssuesStatusBadge, Link } from "../components";
import IssuesAction from "./IssuesAction";
import { Issue, Status } from "../generated/prisma";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Issuepageprops {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async (props: Issuepageprops) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Stauts", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];
  const resolvedParams = await props.searchParams;
  const rawStatus = resolvedParams.status;
  const orderBy = resolvedParams.orderBy;
  const statuses = Object.values(Status);

  const status = statuses.includes(rawStatus) ? rawStatus : undefined;

  console.log("Search param status:", status);

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <IssuesAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{ query: { ...resolvedParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
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
