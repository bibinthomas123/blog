import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import SinglePost from '../../pages/single_page/SinglePost'
import "./single.css"
export default function Single() {
  return (
    <div className="single">
        <SinglePost />

        <Sidebar />
    </div>
  )
}
