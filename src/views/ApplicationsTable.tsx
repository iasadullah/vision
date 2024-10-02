import React, { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

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
  Typography
} from '@mui/material'
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material'

// import { useTheme } from '@mui/material/styles'

import { AllAlumniRequest } from '@/Services/AllRequestService'

import ApiNames from '@/constants/ApiNames'

import { fetchPut } from '@/Services/NetWorkServices'

type ApplicationsList = {
  id: number
  fullName: string
  city: string
  contact: string
  email: string
  status: string
}

const ApplicationsTable: React.FC = () => {
  const [data, setData] = useState<ApplicationsList[]>([])
  const [updateTrigger, setUpdateTrigger] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const getAllRequest = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await AllAlumniRequest(ApiNames.allApplications)

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
        applicationId: id,
        status: newStatus
      }

      const response = await fetchPut(ApiNames.updateApplicationRequest, data)

      console.log('response', response)

      // Trigger a re-fetch of the data
      setUpdateTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleViewDetails = (id: number) => {
    // history.pushState({ applicationId: id }, '', '/userApplication')

    router.push(`/userApplication?applicationId=${id}`)
  }

  const columnHelper = createColumnHelper<ApplicationsList>()

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
    columnHelper.accessor('fullName', {
      header: 'NAME'
    }),
    columnHelper.accessor('email', {
      header: 'EMAIL'
    }),
    columnHelper.accessor('contact', {
      header: 'CONTACT'
    }),
    columnHelper.accessor('city', {
      header: 'CITY'
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
    columnHelper.accessor('id', {
      id: 'updateStatus',
      header: 'UPDATE STATUS',
      cell: info => {
        const status = info.row.original.status

        if (status === 'APPROVED') {
          return (
            <IconButton color='error' onClick={() => handleStatusUpdate(info.row.original.id, 'REJECTED')} size='small'>
              <CancelOutlined />
              <span style={{ marginLeft: '4px', fontSize: '0.8rem' }}>Reject</span>
            </IconButton>
          )
        } else if (status === 'REJECTED') {
          return (
            <IconButton
              color='success'
              onClick={() => handleStatusUpdate(info.row.original.id, 'APPROVED')}
              size='small'
            >
              <CheckCircleOutline />
              <span style={{ marginLeft: '4px', fontSize: '0.8rem' }}>Approve</span>
            </IconButton>
          )
        } else {
          // For 'INREVIEW' or any other status
          return (
            <div>
              <IconButton
                color='success'
                onClick={() => handleStatusUpdate(info.row.original.id, 'APPROVED')}
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
    }),
    columnHelper.accessor('id', {
      header: '',
      cell: info => {
        return (
          <IconButton color='success' onClick={() => handleViewDetails(info.row.original.id)} size='small'>
            <span style={{ marginLeft: '4px', fontSize: '0.8rem' }}>View Details</span>
          </IconButton>
        )
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

export default ApplicationsTable
