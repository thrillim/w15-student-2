'use client'
import Link from 'next/link'
export default function CreateButton(params: {id: string}) {
  return (
    <Link className="btn btn-primary btn-sm lg:m-[1.5em] md:m-[1em]" href={`/createStudent`} target="_blank">Thêm mới</Link>
  )
}