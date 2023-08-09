import { IMeta } from '@/pages/Users'
import { Switch } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
function Table({ setMeta, meta }: { setMeta: Function; meta: IMeta }) {
  const [tableData, setTableData] = useState([])

  const [isCheckedAll, setIsCheckedAll] = useState(false)

  const callApiTabelData = async (pageData: number) => {
    try {
      const { data } = await axios.get(`https://reqres.in/api/users?page=${pageData}`)

      setTableData(data.data)
      setMeta({ ...meta, totalPage: data.total_pages })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    callApiTabelData(meta.page)
  }, [meta.page])

  const handleCheckboxChange = () => {
    setIsCheckedAll(!isCheckedAll)
  }

  return (
    <table className='w-full rounded-[12px] overflow-hidden'>
      <thead className='w-full bg-[#add4fa] text-[#0984e3]'>
        <tr className='table-titles flex items-center justify-between font-bold w-full px-6 py-2'>
          <td className='w-[14%]'>
            <input
              type='checkbox'
              className='mr-6'
              checked={isCheckedAll}
              onChange={handleCheckboxChange}
            />
            Họ tên
          </td>
          <td className='w-[14%]'>Giới tính</td>
          <td className='w-[14%]'>Ngày sinh</td>
          <td className='w-[14%]'>Quê quán</td>
          <td className='w-[14%]'>Email</td>
          <td className='w-[14%]'>Số điện thoại</td>
          <td className='w-[14%] text-right'>Trạng thái</td>
        </tr>
      </thead>
      <tbody className='w-full bg-[#ecf0f1]'>
        {tableData?.length ? (
          tableData.map((item: IUser) => (
            <tr
              key={item.id}
              className='flex items-center justify-between px-6 py-2 text-[#34495e] w-full'
            >
              <td className='w-[14%]'>
                <input checked={isCheckedAll} type='checkbox' className='mr-6' />
                {item.first_name + '' + item.last_name}
              </td>
              <td className='w-[14%]'>Nam</td>
              <td className='w-[14%]'>Ngày sinh</td>
              <td className='w-[14%]'>Quê quán</td>
              <td className='w-[14%]'>{item.email}</td>
              <td className='w-[14%]'>0123456789</td>
              <td className='w-[14%] text-right'>
                <RenderStatus name={'a'} />
              </td>
            </tr>
          ))
        ) : (
          <>Skeleton</>
        )}
      </tbody>
    </table>
  )
}

const RenderStatus = ({ name }: { name: any }) => {
  const [checked, setChecked] = useState(false)
  const handleChangeChecked = () => {
    setChecked(!checked)
  }
  return (
    <FormControlLabel
      label={checked ? 'Hoạt động' : 'Off'}
      labelPlacement='start'
      control={
        <Switch checked={checked} onChange={handleChangeChecked} name={name.toString()} />
      }
    />
  )
}

export default Table
