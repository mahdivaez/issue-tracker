import { json } from 'stream/consumers'
import { z } from 'zod'
import prisma from '@/prisma/client'
const createIssueSchema = z.object({

    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: Request) {

    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)

    if (!validation.success) return new Response(JSON.stringify(validation.error.errors), { status: 400 })

    const newIssue = await prisma.issue.create({
        data : {
            title : body.title , description : body.description 
        }
    })

    return new Response(JSON.stringify(newIssue) , {status :  201})

}