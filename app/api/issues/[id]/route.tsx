import AuthOption from "@/app/auth/AuthOption";
import { patchIssueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//Update

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { assigneToUserId, title, description } = body;
  if (assigneToUserId) {
    const user =await prisma.user.findUnique({
      where: {
        id: assigneToUserId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }
  const issue = await prisma.issus.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "issue not exist" }, { status: 404 });
  const updatedIssue = await prisma.issus.update({
    where: { id: issue.id },
    data: { title, description, assigneToUserId },
  });
  return NextResponse.json(updatedIssue);
}

// Delete

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
