import Image from "next/image";
import Link from "next/link";
import Pagination from "./components/Pagination";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary Closed={closed} InProgress={inprogress} Open={open} />
        <IssueChart Closed={closed} InProgress={inprogress} Open={open} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata:Metadata = {
  title:'Issue Tracker - Dashboard',
  description:'View a summary of project issues'
}