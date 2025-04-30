import AuthOption from "@/app/auth/AuthOption";
import { issueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma.issus.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "issue not exist" }, { status: 404 });
  const updatedIssue = await prisma.issus.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(updatedIssue);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issus.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "issue not exist" }, { status: 404 });
  await prisma.issus.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}
