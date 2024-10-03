import React from 'react'
import Dashboards from '@/app/components/dashboard'

const Dashboard = ({params}) => {
  
  return (
    <>
    <Dashboards params={params} />
    </>
  )
}

export default Dashboard

export const metadata = {
  title: 'CEMS-dashboard',
}
