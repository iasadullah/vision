import React, { useState, useEffect, useCallback } from 'react'

import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import type { TableContainerProps } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  styled,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Button
} from '@mui/material'
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material'

// import { useTheme } from '@mui/material/styles'

import { AllAlumniRequest } from '@/Services/AllRequestService'
import ApiNames from '@/constants/ApiNames'
import { fetchPut } from '@/Services/NetWorkServices'
import { handleExport } from '@/utils/CommonFunction'

type Employee = {
  id: number
  email: string
  name: string
  contact: string
  dob: string
  city: string
  employmentReqion: string
  attendingYear: string
  status: string
  role: string
  createdAt: string
  updatedAt: string
}

const EmployeeTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([])
  const [updateTrigger, setUpdateTrigger] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getAllRequest = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await AllAlumniRequest(ApiNames.allRequest)

      if (response && response.result) {
        setData(response.result)
      }
    } catch (error) {
      console.error('Error fetching alumni data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getAllRequest()
  }, [getAllRequest, updateTrigger])

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const data = {
        userId: id,
        status: newStatus
      }

      const response = await fetchPut(ApiNames.updateAlumniRequest, data)

      console.log('response', response)

      // Trigger a re-fetch of the data
      setUpdateTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const columnHelper = createColumnHelper<Employee>()

  const StyledTableContainer = styled(TableContainer)<TableContainerProps>(() => ({
    maxWidth: '100%',
    overflowX: 'auto'

    // backgroundColor: theme.palette.background.paper,
    // borderRadius: theme.shape.borderRadius,
    // boxShadow: theme.shadows[2]
  }))

  const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 650,
    '& .MuiTableCell-head': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold'
    },
    '& .MuiTableRow-root': {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1.5)
  }))

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => <span key={`id-${info.row.id}`}>{info.getValue()}</span>
    }),
    columnHelper.accessor('name', {
      header: 'NAME'
    }),
    columnHelper.accessor('email', {
      header: 'EMAIL'
    }),
    columnHelper.accessor('contact', {
      header: 'CONTACT'
    }),
    columnHelper.accessor('dob', {
      header: 'D.O.B'
    }),
    columnHelper.accessor('city', {
      header: 'CITY'
    }),
    columnHelper.accessor('employmentReqion', {
      header: 'REGION'
    }),
    columnHelper.accessor('attendingYear', {
      header: 'ATTENDING YEAR'
    }),
    columnHelper.accessor('status', {
      header: 'STATUS',
      cell: info => (
        <Chip
          label={info.getValue()}
          color={info.getValue() === 'INREVIEW' ? 'warning' : info.getValue() === 'REJECTED' ? 'error' : 'success'}
          size='small'
        />
      )
    }),
    columnHelper.accessor('role', {
      header: 'ROLE'
    }),
    columnHelper.accessor('id', {
      id: 'updateStatus',
      header: 'UPDATE STATUS',
      cell: info => {
        const status = info.row.original.status

        if (status === 'ACTIVE') {
          return (
            <IconButton color='error' onClick={() => handleStatusUpdate(info.row.original.id, 'REJECTED')} size='small'>
              <CancelOutlined />
              <span style={{ marginLeft: '4px', fontSize: '0.8rem' }}>Reject</span>
            </IconButton>
          )
        } else if (status === 'REJECTED') {
          return (
            <IconButton color='success' onClick={() => handleStatusUpdate(info.row.original.id, 'ACTIVE')} size='small'>
              <CheckCircleOutline />
              <span style={{ marginLeft: '4px', fontSize: '0.8rem' }}>Activate</span>
            </IconButton>
          )
        } else {
          // For 'INREVIEW' or any other status
          return (
            <div>
              <IconButton
                color='success'
                onClick={() => handleStatusUpdate(info.row.original.id, 'ACTIVE')}
                size='small'
              >
                <CheckCircleOutline />
              </IconButton>
              <IconButton
                color='error'
                onClick={() => handleStatusUpdate(info.row.original.id, 'REJECTED')}
                size='small'
              >
                <CancelOutlined />
              </IconButton>
            </div>
          )
        }
      }
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <Button
        variant='contained'
        type='submit'
        onClick={() => {
          handleExport(data)
        }}
        style={{ marginBottom: '20px' }}
      >
        Export Csv
      </Button>
      {isLoading ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
          <Typography variant='h6' color='textSecondary'>
            No data found
          </Typography>
        </Box>
      ) : (
        <StyledTableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={`header-${headerGroup.id}`}>
                  {headerGroup.headers.map(header => (
                    <StyledTableCell key={`header-cell-${header.id}`}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={`row-${row.id}`}>
                  {row.getVisibleCells().map(cell => (
                    <StyledTableCell key={`cell-${cell.column.id}-${row.id}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      )}
    </>
  )
}

export default EmployeeTable
