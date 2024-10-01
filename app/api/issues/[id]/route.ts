import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Validate the incoming request body
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify(validation.error.errors), { status: 400 });
    }

    // Find the issue by its ID
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    // If issue doesn't exist, return an error
    if (!issue) {
      return new Response(JSON.stringify({ error: "Invalid issue" }), { status: 404 });
    }

    // Update the issue
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    // Return the updated issue
    return new Response(JSON.stringify(updatedIssue), { status: 200 });
  } catch (err) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Find the issue by its ID
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    // If issue doesn't exist, return an error
    if (!issue) {
      return new Response(JSON.stringify({ error: "Invalid issue" }), { status: 404 });
    }

    // Delete the issue
    await prisma.issue.delete({
      where: { id: issue.id },
    });

    // Return a success response
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}