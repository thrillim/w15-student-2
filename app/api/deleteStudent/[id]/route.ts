import { NextResponse } from 'next/server'
import { prisma } from '../../client'
import { Student } from '@prisma/client';


export async function DELETE(request: Request,
  { params }: { params: { id: string }; }) {
  'use server'
  let data: Student | null = null;
  try {
    data = await prisma.student.delete({
      where: {
        id: parseInt(params.id)
      }
    })
  } catch (err) {
    console.error(err)
  } finally {
    console.log(data)
    return NextResponse.json(data)
  }
}
