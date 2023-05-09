import { NextResponse } from 'next/server'
import { prisma } from '../../client'

type Student = {
  id?: number,
  name?: string,
  birthDate?: Date,
  gender?: string,
  hometown?: string,
  classId?: string,
}

export async function PUT(request: Request,
  { params }: { params: { id: string } }) {
  'use server'
  let data;
  let student: Student;
  try {
    if (request.method !== 'PUT') {
      throw new Error('Method not allowed')
    }
    data = await request.json()
    student = await prisma.student.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        name: data.name ? data.name : "Not given",
        birthDate: data.birthDate ? new Date(data.birthDate) : new Date("1000-01-01"),
        gender: "Not given",
        hometown: data.hometown ? data.hometown : "Not given",
        classId: "311mk"
      }
    })
  } catch (err: any) {
    // console.error(err)
    if (err.code === 'P2005') {
      console.log('Student not found')
      // return NextResponse.json({ error: 'Student not found' }, { status: 400 })
    }
  } finally {
    console.log(data)
    return NextResponse.json(data)
  }
}
