'use client'
import Link from 'next/link'
export default function UpdateButton(params: {id: string}) {
  return (
    <Link className="btn btn-primary btn-sm" href={`/updateStudent/${params.id}`} target="_blank">Sửa</Link>
  )
}