'use client'
import { AxiosInterceptorInstance } from '@/services/axios-interceptor-instance'
import '@/theme/dx.material.salvaterra-fight-club-theme.css'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Calendar, List, SelectBox } from 'devextreme-react'
import { SelectionChangedEvent } from 'devextreme/ui/list'
import DataSource from 'devextreme/data/data_source'
import { ValueChangedEvent } from 'devextreme/ui/calendar'
import { useCallback, useMemo, useState } from 'react'

const modalities = [
  {
    id: 1,
    name: 'Muay Thai',
  },
  {
    id: 2,
    name: 'Jiu-Jitsu',
  },
]

type AttendanceSelectedList = {
  attendanceDate: Date
  modalityId: number
  memberId: string
}

type AttendanceMember = {
  id: string
  fullName: string
  modalityId: number
}

const Attendance = () => {
  const [attendanceDate, setattendanceDate] = useState(new Date())
  const [currentModality, setCurrentModality] = useState(modalities[0])
  const [selectedItemKeys, setSelectedItemKeys] = useState<string[]>([])

  const onAttendanceDateChange = useCallback(({ value }: ValueChangedEvent) => {
    setattendanceDate(value)
  }, [])

  const { data: attendanceMembersList } = useQuery({
    queryKey: ['attendanceMembersList'],
    queryFn: async () => {
      const { data } = await AxiosInterceptorInstance.post('/members/columns', {
        columns: ['id', 'fullName', 'modalityId'],
      })
      const { members } = data
      members.sort((a: { fullName: string }, b: { fullName: string }) =>
        a.fullName.localeCompare(b.fullName),
      )
      return members
    },
  })

  const attendanceMutation = useMutation({
    mutationFn: async (attendanceSelectedList: AttendanceSelectedList) => {
      const { data } = await AxiosInterceptorInstance.post(
        '/attendances',
        attendanceSelectedList,
      )
      return data
    },
  })

  const deleteAttendanceMutation = useMutation({
    mutationFn: async (id: string) => {
      await AxiosInterceptorInstance.delete(`/attendances/${id}`)
    },
  })

  const handleSelectionChange = useCallback(
    (e: SelectionChangedEvent) => {
      const { addedItems, removedItems } = e

      const addedItem = addedItems[0] as AttendanceMember
      const removedItem = removedItems[0] as AttendanceMember

      if (addedItem && !selectedItemKeys.includes(addedItem.id)) {
        attendanceMutation.mutate({
          attendanceDate,
          modalityId: currentModality.id,
          memberId: addedItem.id,
        })
        setSelectedItemKeys([...selectedItemKeys, addedItem.id])
      }

      if (removedItem) {
        deleteAttendanceMutation.mutate(removedItem.id)
        setSelectedItemKeys(
          selectedItemKeys.filter((id) => id !== removedItem.id),
        )
      }
    },
    [
      selectedItemKeys,
      attendanceMutation,
      attendanceDate,
      currentModality.id,
      deleteAttendanceMutation,
    ],
  )

  const attendanceMembersDataSource = new DataSource({
    store: attendanceMembersList,
    filter: [
      ['modalityId', '=', currentModality.id],
      'or',
      ['modalityId', '=', '3'],
    ],
  })

  return (
    <div suppressHydrationWarning className="dx-viewport p-5">
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
        <div>
          <Calendar
            value={attendanceDate}
            onValueChanged={onAttendanceDateChange}
            showWeekNumbers={true}
            width={500}
            height={500}
          />
        </div>
        <div>
          <SelectBox
            items={modalities}
            displayExpr={'name'}
            value={currentModality}
            onValueChanged={(e) => {
              setCurrentModality(e.value)
            }}
          />
          <List
            indicateLoading={true}
            dataSource={attendanceMembersDataSource}
            height={'600'}
            showSelectionControls={true}
            selectionMode={'multiple'}
            selectByClick={true}
            selectedItemKeys={selectedItemKeys}
            onSelectionChanged={handleSelectionChange}
            displayExpr={'fullName'}
            keyExpr={'id'}
            searchEnabled={true}
            searchMode="contains"
            searchExpr={['fullName']}
          ></List>
        </div>
      </div>
    </div>
  )
}

export default Attendance
