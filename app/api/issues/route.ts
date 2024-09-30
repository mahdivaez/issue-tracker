import { json } from 'stream/consumers'
import prisma from '@/prisma/client'
import { issueSchema } from '../../validationSchema'
export async function POST(request: Request) {

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (!validation.success) return new Response(JSON.stringify(validation.error.errors), { status: 400 })

    const newIssue = await prisma.issue.create({
        data : {
            title : body.title , description : body.description 
        }
    })

    return new Response(JSON.stringify(newIssue) , {status :  201})

}