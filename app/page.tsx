import Image from "next/image";
import Link from "next/link";
import Pagination from "./components/Pagination";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return <IssueChart Closed={closed}InProgress={inprogress}Open={open}/>;
}
