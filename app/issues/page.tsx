import { prisma } from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import { Status } from "../generated/prisma";
import IssuesAction from "./IssuesAction";
import IssueTable, { columnIssue, IssueQuery } from "./IssueTable";

interface Issuepageprops {
  searchParams: Promise< IssueQuery >;
}

const IssuesPage = async (props: Issuepageprops) => {
  const resolvedParams = await props.searchParams;
  const rawStatus = resolvedParams.status;
  const orderedBy = resolvedParams.orderBy;
  const page = parseInt(resolvedParams.page) || 1;
  const pageSize = 10;
  const statuses = Object.values(Status);

  const status = statuses.includes(rawStatus) ? rawStatus : undefined;
  const orderBy = columnIssue.includes(orderedBy)
    ? { [orderedBy]: "asc" }
    : undefined;

  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssuesAction />
      <IssueTable searchParams={resolvedParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex >
  );
};

export default IssuesPage;
