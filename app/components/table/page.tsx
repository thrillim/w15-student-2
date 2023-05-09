'use client'
// import Student from "@prisma/client";
import useSWR, { mutate } from 'swr'
import UpdateButton from '../updateButton/page'
import { Student } from '@prisma/client';


function rewriteDate(date: string) {
  let day = date.slice(8, 10);
  let month = date.slice(5, 7);
  let year = date.slice(0, 4);
  return day + "-" + month + "-" + year;
}

function deleteStudent(id: string) {
  const data = fetch(`/api/deleteStudent/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  })
}

const fetcher = () => fetch('/api/getStudents', { method: "GET" }).then((res) => res.json())

export default function Table() {
  const { data: students, isLoading, mutate } = useSWR<Student[]>('/api/getStudents', fetcher)
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {students && students.length === 0 && <div>There are no students</div>}
      <table className="table rounded-xl lg:m-[1.5em] md:m-[1em] bg-primary-content lg:border-spacing-0.5 md:border-spacing-0.2 sm:border-spacing-0 lg:text-[1.2em] md:text-[0.9em] sm:text-[0.7em]" id="table">
        <thead>
          <tr className="text-neutral-content bg-neutral text-center">
            <th className='text-[1em]'>STT</th>
            <th className='text-[1em]'>Mã SV</th>
            <th className='text-[1em]'>Họ và tên</th>
            <th className='text-[1em]'>Ngày sinh</th>
            <th className='text-[1em]'>Quê quán</th>
            <th className='text-[1em]'>Sửa</th>
            <th className='text-[1em]'>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 &&
            students.map((student: any, index: any) => (
              <tr key={index}>
                <th className='text-center text-black'>{index + 1}</th>
                <td className='text-center text-black'>{student.id}</td>
                <td className='text-black'>{student.name}</td>
                <td className='text-center text-black'>{rewriteDate(student.birthDate)}</td>
                <td className='text-black'>{student.hometown}</td>
                <td className='text-center'><UpdateButton id={student.id} /></td>
                <td><button className="btn btn-error px-1.5 btn-sm text-[0.5em] text-error-content" onClick={() => {
                  deleteStudent(student.id);
                  mutate() // refetch swr
                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              </button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
} 