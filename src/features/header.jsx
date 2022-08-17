import React from 'react'

function TableHead() {
  return (
    <div className="p-5 divide-x-2 bg-slate-400 grid grid-cols-4">
      <span className="text-center">پایان</span>
      <span className="text-center">مدت</span>
      <span className="text-center">شروع</span>
      <span className="text-center">نام فیلم</span>
    </div>
  )
}

export default TableHead