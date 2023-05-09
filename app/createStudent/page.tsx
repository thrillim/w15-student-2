"use client"
import React, { useState, useEffect } from 'react'
import Student from "@prisma/client";

function rewriteDate(date: string) {
  let day = date.slice(8, 10);
  let month = date.slice(5, 7);
  let year = date.slice(0, 4);
  return year + "-" + month + "-" + day;
}


export default function createStudent() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [hometown, setHometown] = useState("")

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (name.length > 100) {
      console.log("Name is too long, please under 100 characters");
      return false;
    }
    if (hometown.length > 100) {
      console.log("Hometown is too long, please under 100 characters");
      return false;
    }
    const data = fetch('/api/createStudent', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        name: name,
        birthDate: birthDate,
        gender: "Not given",
        hometown: hometown,
        classId: "311mk"
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
  }

  return (
    <div className='w-screen h-screen p-5 bg-secondary'>
      <div className="card w-full bg-neutral text-neutral-content backdrop-blur-sm shadow-xl mx-auto mt-[2em] p-3 sm:min-w-1/2 sm:max-w-[500px]">
        <div className='card-body'>
          <div className='text-[2em] text-800 mx-auto card-title font-extrabold'>Thông tin sinh viên mới</div>
          <form onSubmit={(e) => submitForm(e)} className="mx-auto w-full p-3">
          <div className='py-[0.7em] grid md:grid-cols-3'>
              <label htmlFor="id" className='label-text text-lg font-semibold'>Mã sinh viên</label>
              <input type="text" className="input input-sm min-w-[150px] col-span-2" id="id" name="id" required pattern='\d{8}' onChange={(e) => setId(e.target.value)} />
            </div>
            <div className='py-[0.7em] grid md:grid-cols-3'>
              <label htmlFor="name" className='label-text text-lg font-semibold'>Họ và tên</label>
              <input type="text" className="input input-sm min-w-[150px] col-span-2" id="name" name="name" required onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='py-[0.7em] grid md:grid-cols-3'>
              <label htmlFor="birthDate" className='label-text text-lg font-semibold'>Ngày sinh</label>
              <input type="date" className="input input-sm min-w-[150px] col-span-2" id="birthDate" name="birthDate" required min={"1970-01-01"} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            {/* <div className='py-5'>
            <label htmlFor="gender">Giới tính</label>
            <div>
              <input type="radio" value={"Male"} name="gender" /> Nam
              <input type="radio" value={"Female"} name="gender" /> Nữ
              <input type="radio" value={"Other"} name="gender" /> Khác
            </div>
          </div> */}
            <div className='py-[0.7em] grid md:grid-cols-3'>
              <label htmlFor="hometown" className='label-text text-lg font-semibold'>Quê quán</label>
              <input type="text" className="input input-sm min-w-[150px] col-span-2" id="hometown" name="hometown" onChange={(e) => setHometown(e.target.value)} />
            </div>
            <button type="submit" value="submit" className='btn btn-md bg-secondary rounded-2xl block py-0 px-4 mx-auto mt-8 text-secondary-content border-none text-md align-middle hover:bg-info hover:text-info-content'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
