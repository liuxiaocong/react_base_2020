import React from 'react';
import style from './style.css';
import lStyle from './lstyle.module.less';
function Home() {
  const title = 'Home';
  return (
    <div
      className={style.title}
    >
      <p className={lStyle.header}>
        Less style
      </p>
      { title }

    </div>
  )
}

export default Home;