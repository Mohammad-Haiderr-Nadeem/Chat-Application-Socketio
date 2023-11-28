import React from 'react'
import styles from './Tenants.module.css'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'

function Tenant () {
  const navigate = useNavigate()
  const tenants = [
    {
      id: 1,
      roomId: 101,
      name: 'John Doe'
    },
    {
      id: 2,
      roomId: 102,
      name: 'Jane Smith'
    },
    {
      id: 3,
      roomId: 101,
      name: 'Mark Dwanye'
    },
    {
      id: 4,
      roomId: 102,
      name: 'Juliya Roberts'
    },
    {
      id: 5,
      roomId: 103,
      name: 'Asjad Naeem'
    }
  ]

  const filteredTenants = tenants?.filter((tenant) => tenant.roomId === 101)

  const handleOnClickUser = () => {
    navigate('/chat')
  }

  return (
    <React.Fragment>
      <div className={styles.tenantsContainer}>
        <h1 className={styles.tenantsTitle}>Tenants:</h1>
        {filteredTenants.length
          ? (
              filteredTenants.map((tenant) => (
            <div key={tenant.id} className={styles.listOfTenants}>
              <PersonIcon />
              <span className={styles.tenantName} onClick={handleOnClickUser}>
                {tenant.name}
              </span>
            </div>
              ))
            )
          : (
          <p>No Tenants available</p>
            )}
      </div>
    </React.Fragment>
  )
}

export default Tenant
