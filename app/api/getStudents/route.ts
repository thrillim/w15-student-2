import { NextResponse } from 'next/server'
import { prisma } from '../client'
import { Student } from '@prisma/client';

export async function GET() {
  'use server'
  let data : Student[] = [];
  try {
    data = await prisma.student.findMany()
  } catch (err) {
    console.error(err)
  } finally {
    console.log(data)
    return NextResponse.json(data)
  }
}
