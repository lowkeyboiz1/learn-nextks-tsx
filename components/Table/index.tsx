'use client'

import { IMeta } from '@/pages/Users'
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import { log } from 'console'
import React, { useState, useEffect, useRef } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
  status: any
  birthday: any
  homeTown: any
  gender: any
  phoneNumber: any
}

export const callApiTabelData = async (
  pageData: number,
  searchValue: any,
  meta: any,
  setMeta: any,
  filter: any,
) => {
  try {
    const params = {
      ...(!searchValue?.length
        ? {}
        : {
            search: searchValue,
          }),
      page: pageData,
    }
    const { data } = await axios.get(`https://reqres.in/api/users`, {
      params,
    })

    setMeta({ ...meta, dataForm: data.data, totalPage: data.total_pages })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function Table({
  setMeta,
  meta,
  searchValue,
  filter,
  setFilter,
}: {
  setMeta: Function
  meta: IMeta
  searchValue: any
  filter: any
  setFilter: any
}) {
  const [tableData, setTableData] = useState([])

  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false)
  const [arrChecked, setArrChecked] = useState<number[]>([])

  const [searchValueDebounce, setSearchValueDebounce] = useState(searchValue)

  useEffect(() => {
    callApiTabelData(meta.page, searchValue, meta, setMeta, filter)
  }, [meta.page, searchValueDebounce])

  let timer = useRef<any>(null)

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setSearchValueDebounce(searchValue)
    }, 250)

    return () => {
      clearTimeout(timer.current)
    }
  }, [searchValue])
  // const _HandleCheckAll = () => {
  //   setArrChecked([...de])
  // }

  const handleCheckboxChange = (ids: any) => {
    if (arrChecked?.length === ids?.length) {
      const newArr: any[] = []
      setArrChecked([])
      setIsCheckedAll(false)
    } else {
      const newArr: any[] = [...ids].map((item) => item.id)
      setArrChecked(newArr)
      setIsCheckedAll(true)
    }
  }
  const handleChangeStatus = (id: number, value: any) => {
    const clone = [...meta.dataForm]
    const findIndex = clone.findIndex((item) => item.id === id)
    clone[findIndex].status = value
    setMeta({
      ...meta,
      dataForm: clone,
    })
  }

  const handleChangeCheckBox = (id: number) => {
    if (arrChecked.includes(id)) {
      const newArrChecked = [...arrChecked].filter((item) => item !== id)
      console.log(newArrChecked)

      setArrChecked(newArrChecked)
      setIsCheckedAll(newArrChecked.length === meta.dataForm.length)
    } else {
      const newArrChecked = [...arrChecked, id]
      setArrChecked([...newArrChecked])
      // console.log(arrChecked)
      setIsCheckedAll(newArrChecked.length === meta.dataForm.length)
    }
    // console.log(arrChecked.length, meta.dataForm.length)
  }
  const handleClick = () => {
    console.log('1')
  }

  return (
    <table className='w-full rounded-[12px] overflow-hidden'>
      <thead className='w-full bg-[#add4fa] text-[#0984e3]'>
        <tr className='table-titles flex items-center justify-between font-bold w-full px-6 py-2'>
          <td className='w-[14%]'>
            <input
              type='checkbox'
              className='mr-6'
              checked={meta.dataForm.length === arrChecked.length}
              onChange={() => handleCheckboxChange(meta.dataForm)}
            />
            Họ tên
          </td>
          <td className='w-[14%] flex gap-3 items-center'>
            <div>Giới tính</div>
            {/* <ShortList
              filter={filter}
              setFilter={setFilter}
              shortBy={['Nam', 'Nữ']}
              keyCat={'gender'}
            /> */}
          </td>
          <td className='w-[14%]'>Ngày sinh</td>
          <td className='w-[14%] flex gap-3 items-center'>
            <div>Quê quán</div>
            {/* <ShortList
              filter={filter}
              setFilter={setFilter}
              keyCat={'homeTown'}
              shortBy={['Nam', 'Nữ']}
            /> */}
          </td>
          <td className='w-[14%]'>Email</td>
          <td className='w-[14%]'>Số điện thoại</td>
          <td className='w-[14%] text-right flex gap-3 items-center'>
            <div>Trạng thái</div>
            {/* <ShortList
              filter={filter}
              keyCat={'status'}
              setFilter={setFilter}
              shortBy={['Onl', 'Off']}
            /> */}
          </td>
        </tr>
      </thead>
      <tbody className='w-full bg-[#ecf0f1]'>
        {meta.dataForm?.length ? (
          meta.dataForm.map((item: IUser) => (
            <tr
              key={item.id}
              className='flex items-center justify-between px-6 py-2 text-[#34495e] w-full'
            >
              <td className='w-[14%]'>
                <RenderInputCheckBox
                  isChecked={arrChecked.includes(item.id)}
                  handleChangeCheckBox={() => handleChangeCheckBox(item.id)}
                />
                {item.first_name + '' + item.last_name}
              </td>
              <td className='w-[14%]'>
                {item?.gender ? (item?.gender === 'female' ? 'Nữ' : 'Nam') : 'Nam'}
              </td>
              <td className='w-[14%]'>
                {item?.birthday ? item?.birthday : '12/31/2023'}
              </td>
              <td className='w-[14%]'>{item?.homeTown ? item?.homeTown : 'TPHCM'}</td>
              <td className='w-[14%]'>{item.email}</td>
              <td className='w-[14%]'>
                {item?.phoneNumber ? item?.phoneNumber : '0912345678'}
              </td>
              <td className='w-[14%] text-right'>
                <RenderStatus
                  status={item.status === 'onl'}
                  name={'a'}
                  handleChangeStatus={(value: string) =>
                    handleChangeStatus(item.id, value)
                  }
                />
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
const RenderInputCheckBox = ({
  isChecked,
  handleChangeCheckBox,
}: {
  isChecked: boolean
  handleChangeCheckBox: () => void
}) => {
  // const [checked, setChecked] = useState(false)
  return (
    <input
      name='userCheck'
      checked={isChecked}
      onChange={handleChangeCheckBox}
      type='checkbox'
      className='mr-6'
    />
  )
}

const RenderStatus = ({
  name,
  status = false,
  handleChangeStatus,
}: {
  name: any
  status: boolean
  handleChangeStatus: (value: string) => void
}) => {
  const [checked, setChecked] = useState(status)
  const handleChangeChecked = () => {
    setChecked(!checked)
    handleChangeStatus(checked ? 'off' : 'onl')
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

const ShortList = ({
  shortBy,
  setFilter,
  filter,
  keyCat,
}: {
  shortBy: any
  setFilter: any
  filter: any
  keyCat: any
}) => {
  const [select, setSelect] = React.useState('')

  const handleChange = (event: any) => {
    const valueSelect = event.target.value
    setSelect('')
    setFilter({ ...filter, [keyCat]: valueSelect })
  }

  return (
    <span className='ml-4 cursor-pointer'>
      <FormControl sx={{ maxWidth: '100px' }}>
        <Select onChange={handleChange} value={select}>
          {shortBy?.length &&
            shortBy?.map((item: any, index: any) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </span>
  )
}

export default Table
