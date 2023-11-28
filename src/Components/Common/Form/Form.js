import React from 'react'
import styles from './Form.module.css'

// eslint-disable-next-line react/prop-types
function Form ({ handleSubmit, email, handleOnChangeEmail, password, handleOnChangePassowrd, handleOnclickSpan, children, buttonText, spanText, spanButton }) {
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {children}
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@email.com"
            value={email}
            onChange={handleOnChangeEmail}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChangePassowrd}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          {buttonText}
        </button>
        <p className={styles.myPara}>
          {spanText}
          <span onClick={handleOnclickSpan} className={styles.mySpan}>
            {spanButton}
          </span>
        </p>
      </form>
    </React.Fragment>
  )
}

export default Form
