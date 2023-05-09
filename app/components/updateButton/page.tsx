'use client'
import Link from 'next/link'
export default function UpdateButton(params: {id: string}) {
  return (
    <Link className="btn btn-info btn-sm text-[0.9em]" href={`/updateStudent/${params.id}`} target="_blank">Sửa</Link>
  )
}