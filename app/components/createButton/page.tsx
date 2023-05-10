'use client'
import Link from 'next/link'
export default function CreateButton() {
  return (
    <Link className="btn btn-primary text-primary-content sm:btn-sm lg:btn-md lg:text-lg lg:ml-[1.75em] lg:mt-[0.5em] md:ml-[1em] md:mt-[0.25em]" 
    href={`/createStudent`} target="_blank">Thêm mới</Link>
  )
}