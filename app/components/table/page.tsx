'use client'
// import Student from "@prisma/client";
import useSWR from 'swr'
import UpdateButton from '../updateButton/page'
import { Student } from '@prisma/client';

function rewriteDate(date: string) {
  let day = date.slice(8, 10);
  let month = date.slice(5, 7);
  let year = date.slice(0, 4);
  return day + "-" + month + "-" + year;
}

const fetcher = () => fetch('/api/getStudents', {method: "GET"}).then((res) => res.json())

export default function Table() {
  const { data:students, isLoading } = useSWR<Student[]>('/api/getStudents', fetcher)
  return (
    <div>        
      {isLoading && <div>Loading...</div>}
      {students && students.length === 0 && <div>There are no students</div>}
      <table className="table rounded-xl m-[1.5em] bg-secondary-content border-spacing-0.5" id="table">
        <thead>
          <tr>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">STT</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Mã SV</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Họ và tên</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Ngày sinh</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Quê quán</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Sửa</th>
            <th className="text-[1em] text-neutral-content bg-neutral text-center">Xóa</th>
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
              <td className='text-center text-black'><UpdateButton id={student.id}/></td>
              <td className='text-center text-black'><button className="btn btn-error btn-sm">Delete</button></td>
              {/* <td><DeleteBtn id={student.id} /></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 