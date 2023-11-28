/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styles from './HomePage.module.css'
import NavbarComponent from '../../Navbar/Navbar'
import CategoryBoxes from './CategoryBoxes/CategoryBoxes'
import RoomList from './RoomList/RoomList'

function HomePage ({ setIsHomePage, rooms, setId, name, setName }) {
  const [roomType, setRoomType] = useState('single')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
  }

  return (
    <React.Fragment>
      <NavbarComponent name={name} setName={setName} />
      <div className={styles.searchContainer}>
        <h3 className={styles.myHomePageTitle}>Mera RooMate</h3>
        <input
          type="search"
          placeholder="Search"
          className={styles.mySearchBar}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <CategoryBoxes setRoomType={setRoomType} />
      <select
        className={styles.mySelectContainer}
        onChange={handleSortChange}
        value={sortOrder}
      >
        <option value="">Select a filter</option>
        <option value="highToLow">High to Low</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highestRated">Highest Rated</option>
      </select>
      <RoomList roomType={roomType} search={search} sortOrder={sortOrder} setIsHomePage={setIsHomePage} rooms={rooms} setId={setId}/>
    </React.Fragment>
  )
}

export default HomePage
