import React, { useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Switch,
  TableBody,
  TableCell,
  TablePagination,
  TextField,
  Tooltip,
} from '@mui/material'
import CardItem from '../../components/CardItem'
import Layout from '../../components/Layout'
import PercentRange from '../../components/PercentRange'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddIcon from '@mui/icons-material/Add'
import { Filter } from 'iconsax-react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

interface GridSelectionModelChangeParams {
  selectionModel: number[]
}

interface Row {
  id: number
  lastName: string
  firstName: string
  age: number | null
}

const columns: GridColDef[] = [
  // Your column definitions here...
]

const rows: Row[] = [
  // Your row data here...
]

function Users() {
  const [searchValue, setSearchValue] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectionModel, setSelectionModel] = useState<number[]>([])

  const handleSelectionModelChange = (params: GridSelectionModelChangeParams) => {
    setSelectionModel(params.selectionModel)
  }

  const clearSearchInput = () => {
    setSearchValue('')
    inputRef.current!.focus() // Using non-null assertion here
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
          onChange={(e) => setSearchValue(e.target.value)}
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
                    display: searchValue.length > 0 ? 'block' : 'none',
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
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            className={'bg-[#3498db] hover:bg-[#2980b9]'}
          >
            Tạo mới
          </Button>
        </Box>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
        />
      </div>
    </Layout>
  )
}

export default Users
