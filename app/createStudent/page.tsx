"use client"
import React, { useState } from 'react'

export default function createStudent() {
  // return a form with fields: id, name, birthDate, gender, hometown
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [hometown, setHometown] = useState("")

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    const data = await fetch("http://localhost:3000/api/createStudent", {
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
    <main className='w-screen h-screen'>
      <h1>Thông tin sinh viên</h1>
      <form onSubmit={(e) => submitForm(e)} className="mx-auto w-1/2">
        <div className='py-5'>
          <label htmlFor="id">Mã sinh viên</label>
          <input type="text" id="id" name="id" onChange={(e) => setId(e.target.value)} />
        </div>
        <div className='py-5'>
          <label htmlFor="name">Họ và tên</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='py-5'>
          <label htmlFor="birthDate">Ngày sinh</label>
          <input type="date" id="birthDate" name="birthDate" onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        {/* <div className='py-5'>
          <label htmlFor="gender">Giới tính</label>
          <div>
            <input type="radio" value={"Male"} name="gender" /> Nam
            <input type="radio" value={"Female"} name="gender" /> Nữ
            <input type="radio" value={"Other"} name="gender" /> Khác
          </div>
        </div> */}
        <div className='py-5'>
          <label htmlFor="hometown">Quê quán</label>
          <input type="text" id="hometown" name="hometown" onChange={(e) => setHometown(e.target.value)} />
        </div>
        <button type="submit" value="submit" className='bg-primary rounded block p-2'>Submit</button>
      </form>
    </main>
  )
}
