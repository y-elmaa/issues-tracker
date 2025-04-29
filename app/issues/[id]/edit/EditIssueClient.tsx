"use client";
import dynamic from "next/dynamic";
import { Issus } from "@/app/generated/prisma";
import IssueFormLoding from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoding />,
});

const EditIssueClient = ({ issue }: { issue: Issus }) => {
  return <IssueForm issue={issue} />;
};

export default EditIssueClient;
