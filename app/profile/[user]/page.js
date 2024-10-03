"use client"
import React,{useEffect} from 'react'
import Profile from '@/app/components/profile'


const profile = ({params}) => {

    return (
        <>
        <Profile params={params}/>     
        </>
    )
}

export default profile

