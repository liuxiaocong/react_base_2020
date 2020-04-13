import React from 'react';
import style from './style.css';
function Home() {
  const title = 'Home';
  return (
    <div
      className={style.title}
    >{ title }</div>
  )
}

export default Home;