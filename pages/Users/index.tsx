import React, { useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, InputAdornment, Pagination, TextField } from '@mui/material'
import CardItem from '../../components/CardItem'
import Layout from '../../components/Layout'
import PercentRange from '../../components/PercentRange'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { Filter } from 'iconsax-react'
import Table, { callApiTabelData } from '@/components/Table'
import DrawerAdd from '@/components/DrawerAdd'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export interface IMeta {
  page: number
  totalPage: number
  total: number
  dataForm: any
}

function Users() {

  const router = useRouter()

  const [searchValue, setSearchValue] = useState(router.query.search || '')
  const [dataFromFormInput, setDataFromFormInput] = useState({})
  const [meta, setMeta] = useState<IMeta>({
    page: 1,
    totalPage: 1,
    total: 0,
    dataForm: [],
  })

  const [filter, setFilter] = useState({
    gender: 'Nam',
    homeTown: 'HCM',
    status: 'Onl',
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  // let debounceQuery = useRef<any>(null)

  const handleSearch = (e: any) => {
    const value = e.target.value
    setSearchValue(value)
    // clearTimeout(debounceQuery.current)
    // debounceQuery.current = setTimeout(() => {
    //   // handleUrl
    //   router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, search: e.target.value },
    //   })
    // }, 250)

    if (value?.length <= 0) {
      router.push({
        pathname: router.pathname,
        query: '',
      })
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: e.target.value },
      })
    }
  }

  const handleUrl = (value: any) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: value },
    })
  }
  useEffect(() => {
    // Update searchValue when query.search changes
    const querySearch: any = router.query.search
    setSearchValue(querySearch || '')
  }, [router.query.search])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      callApiTabelData(1, searchValue, meta, setMeta, filter)
    }, 250)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchValue, filter])

  // useEffect(() => {
  // }, [filter])

  const clearSearchInput = () => {
    setSearchValue('')
    handleUrl('')
    inputRef.current!.focus() // Using non-null assertion here

    router.push({
      pathname: router.pathname,
      query: '',
    })
  }

  return (
    <Layout>
      <div className='text-[32px] font-bold text-black'>Tổng quan user thợ</div>
      <div className='cards flex justify-between mt-[20px]'>
        <CardItem>
          <div className='top'>
            <div className='sub-header text-[#b2bec3]'>Tổng số lượng</div>
            <div className='header text-[28px] text-black'>5000 Thợ</div>
          </div>
          <div className='bottom flex flex-col gap-3'>
            <div className='flex justify-between items-center mt-[8px]'>
              <div className='text-[#b2bec3]'>Thợ đã ekYC</div>
              <div className='text-[18px] text-[#3498db]'>3400</div>
            </div>
            {/* percent range */}
            <PercentRange percent={74} />
            <div className='hidden'>
              <div className='label text-black'>20-30</div>
              <div className='percent-range relative w-full h-[20px] rounded-[20px] bg-blue-200'>
                <div className='percent absolute'></div>
              </div>
            </div>
          </div>
        </CardItem>
        <CardItem>
          <div className='top'>
            <div className='sub-header text-[#b2bec3] hidden'>Tổng số lượng</div>
            <div className='header text-[28px] text-black'>Theo độ tuổi</div>
          </div>
          <div className='bottom flex flex-col gap-3'>
            <div className='hidden justify-between items-center'>
              <div className='text-[#b2bec3]'>Thợ đã ekYC</div>
              <div className='text-[18px] text-[#3498db]'>3400</div>
            </div>
            {/* percent range */}
            <div className='flex gap-3 flex-col'>
              <div className='w-full flex'>
                <div className='label text-black w-[100px] text-left'>20-30</div>
                <PercentRange percent={64} />
              </div>
              <div className='w-full flex'>
                <div className='label text-black w-[100px] text-left'>30-40</div>
                <PercentRange percent={24} />
              </div>
              <div className='w-full flex'>
                <div className='label text-black w-[100px] text-left'>40-50</div>
                <PercentRange percent={100 - 64 - 24} />
              </div>
            </div>
          </div>
        </CardItem>
        <CardItem>
          <div className='top'>
            <div className='sub-header text-[#b2bec3] hidden'>Tổng số lượng</div>
            <div className='header text-[28px] text-black'>Theo giới tính</div>
          </div>
          <div className='bottom flex flex-col gap-3'>
            <div className='hidden justify-between items-center'>
              <div className='text-[#b2bec3]'>Thợ đã ekYC</div>
              <div className='text-[18px] text-[#3498db]'>3400</div>
            </div>
            {/* percent range */}
            <div className='flex gap-3 flex-col'>
              <div className='w-full flex'>
                <div className='label text-black w-[100px] text-left'>Nam</div>
                <PercentRange percent={64} />
              </div>
              <div className='w-full flex'>
                <div className='label text-black w-[100px] text-left'>Nữ</div>
                <PercentRange percent={100 - 64} />
              </div>
            </div>
          </div>
        </CardItem>
        <CardItem>
          <div className='top'>
            <div className='sub-header text-[#b2bec3] hidden'>Tổng số lượng</div>
            <div className='header text-[28px] text-black'>Theo khu vực</div>
          </div>
          <div className=''>
            <div className='bottom flex flex-col gap-3'>
              <div className='hidden justify-between items-center'>
                <div className='text-[#b2bec3]'>Thợ đã ekYC</div>
                <div className='text-[18px] text-[#3498db]'>3400</div>
              </div>
              {/* percent range */}
              <div className='flex gap-3 flex-col'>
                <div className='w-full flex'>
                  <div className='label text-black w-[100px] text-left'>TPHCM</div>
                  <PercentRange percent={64} />
                </div>
                <div className='w-full flex'>
                  <div className='label text-black w-[100px] text-left'>Hà Nội</div>
                  <PercentRange percent={100 - 64} />
                </div>
              </div>
            </div>
          </div>
        </CardItem>
      </div>
      <div className='text-[32px] font-bold text-black mt-[20px]'>Danh sách user thợ</div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
          my: '20px',
        }}
      >
        <TextField
          inputRef={inputRef}
          id='outlined-search'
          label='Search...'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => handleSearch(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    cursor: 'pointer',
                    display: searchValue?.length > 0 ? 'block' : 'none',
                  }}
                  onClick={clearSearchInput}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 400,
            maxWidth: 600,
          }}
        />
        <Box className={'flex gap-3'}>
          <Button variant='outlined' startIcon={<Filter color='#1976d2' />}>
            Bộ lọc
          </Button>
          <DrawerAdd meta={meta} setMeta={setMeta}>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              className={'bg-[#3498db] hover:bg-[#2980b9]'}
            >
              Tạo mới
            </Button>
          </DrawerAdd>
        </Box>
      </Box>
      <Table
        setMeta={setMeta}
        meta={meta}
        searchValue={searchValue}
        filter={filter}
        setFilter={setFilter}
      />
      <div className='pagination my-[30px] flex justify-between items-center'>
        <Button variant='outlined' startIcon={<DeleteIcon />} className='w-[100px]'>
          Xóa
        </Button>
        <div className='flex gap-2'>
          <Pagination
            onChange={(event: React.ChangeEvent<unknown>, page: number) => {
              setMeta({ ...meta, page })
            }}
            count={meta.totalPage}
          />
        </div>
        <div className='w-[100px]'></div>
      </div>
    </Layout>
  )
}

export default Users
