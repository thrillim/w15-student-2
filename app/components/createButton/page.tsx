'use client'
import Link from 'next/link'
export default function CreateButton() {
  return (
    <Link className="btn btn-primary btn-sm ml-[1.5em] mt-[1.5em]" href={`/createStudent`} target="_blank">Thêm mới</Link>
  )
}