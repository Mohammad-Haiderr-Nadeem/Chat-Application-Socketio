import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faHouse, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import styles from './CategoryBoxes.module.css'

// eslint-disable-next-line react/prop-types
function CategoryBoxes ({ setRoomType }) {
  const onClickSingle = () => {
    setRoomType('single')
  }

  const onClickDouble = () => {
    setRoomType('double')
  }

  const onClickShared = () => {
    setRoomType('shared')
  }

  return (
    <React.Fragment>
      <div className={styles.categoriesContainer}>
        <div className={styles.categoryContainer}>
            <h3 className={styles.categoryTitle} onClick={onClickSingle}>Single</h3>
            <FontAwesomeIcon className={styles.singleRoomIcon} icon={faBed} onClick={onClickSingle}/>
        </div>
        <div className={styles.categoryContainer}>
            <h3 className={styles.categoryTitle} onClick={onClickDouble}>Double</h3>
            <FontAwesomeIcon className={styles.doubleRoomIcon} icon={faHouse} onClick={onClickDouble}/>
        </div>
        <div className={styles.categoryContainer}>
            <h3 className={styles.categoryTitle} onClick={onClickShared}>Shared</h3>
            <FontAwesomeIcon className={styles.sharedRoomIcon} icon={faPeopleRoof} onClick={onClickShared}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CategoryBoxes
