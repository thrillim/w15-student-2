"use client"
import React, { useState, useEffect } from 'react'
import Student from "@prisma/client";

function rewriteDate(date: string) {
  let day = date.slice(8, 10);
  let month = date.slice(5, 7);
  let year = date.slice(0, 4);
  return year + "-" + month + "-" + day;
}

async function getStudent(id: string) {
    // get student from api
    const student: Student = await fetch(`/api/getStudent/${id}`, { method: "GET", next: {
      revalidate: 5
    }}).then((res) => res.json())
    console.log("getStetrerfda: ", student)
    return student
}

export default function updateStudent({ params }: { params: { id: string } }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [hometown, setHometown] = useState("")

  useEffect(() => {
    setLoading(true);
    fetch(`/api/getStudent/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setName(data.name);
        setBirthDate(data.birthDate);
        setHometown(data.hometown)
      });
  }, []);  

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No student with this ID</p>;

  function submitForm(e: React.FormEvent) {
    e.preventDefault()
    const data = fetch(`/api/updateStudent/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: params.id,
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
    <div className='w-screen h-screen p-5'>
        <div className="card w-full glass mx-auto p-3 sm:min-w-1/2 sm:max-w-[500px]">
          <div className='text-2xl mx-auto'>Thông tin sinh viên</div>
          <form onSubmit={(e) => submitForm(e)} className="mx-auto w-full p-5">
            <div className='py-5 grid md:grid-cols-3'>
              <label htmlFor="id">Mã sinh viên</label>
              <input type="text" className="min-w-[150px] col-span-2" id="id" name="id" value={params.id} readOnly />
            </div>
            <div className='py-5 grid md:grid-cols-3'>
              <label htmlFor="name">Họ và tên</label>
              <input type="text" className="min-w-[150px] col-span-2" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='py-5 grid md:grid-cols-3'>
              <label htmlFor="birthDate">Ngày sinh</label>
              <input type="date" className="min-w-[150px] col-span-2" id="birthDate" name="birthDate" value={rewriteDate(birthDate)} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            {/* <div className='py-5'>
            <label htmlFor="gender">Giới tính</label>
            <div>
              <input type="radio" value={"Male"} name="gender" /> Nam
              <input type="radio" value={"Female"} name="gender" /> Nữ
              <input type="radio" value={"Other"} name="gender" /> Khác
            </div>
          </div> */}
            <div className='py-5 grid md:grid-cols-3'>
              <label htmlFor="hometown">Quê quán</label>
              <input type="text" className="min-w-[150px] col-span-2" id="hometown" name="hometown" value={hometown} onChange={(e) => setHometown(e.target.value)} />
            </div>
            <button type="submit" value="submit" className='bg-white rounded block p-2 mx-auto'>Submit</button>
          </form>
        </div>
    </div>
  )
}
