import { NextResponse } from 'next/server'
import { prisma } from '../client'

type Student = {
  id?: number,
  name?: string,
  birthDate?: Date,
  gender?: string,
  hometown?: string,
  classId?: string,
}

export async function POST(request: Request) {
  'use server'
  let data;
  let student: Student;
  try {
    if (request.method !== 'POST') {
      throw new Error('Method not allowed')
    }
    data = await request.json()
    if (!parseInt(data.classId)) {
      throw new Error('classId must be a number')
    }
    student = await prisma.student.create({
      data: {
        id: data.id,
        name: data.name ? data.name : "Not given",
        birthDate: data.birthDate ? new Date(data.birthDate) : new Date("1000-01-01"),
        gender: "Not given",
        hometown: data.hometown ? data.hometown : "Not given",
        classId: "311mk"
      }
    })
  } catch (err: any) {
    // console.error(err)
    if (err.code === 'P2002') {
      console.log('Student already exists')
      // return NextResponse.json({ error: 'Student already exists' }, { status: 400 })
    }
  } finally {
    console.log(data)
    return NextResponse.json(data)
  }
}
