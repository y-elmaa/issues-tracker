import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueClient from "./EditIssueClient";





interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issus.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return <EditIssueClient issue={issue} />;
};

export default EditIssuePage;
