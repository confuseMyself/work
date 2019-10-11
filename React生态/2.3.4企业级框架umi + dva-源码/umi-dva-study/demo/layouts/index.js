import React from 'react'
export default function(props) {
  return (
    <div >
      <h1>顶部栏</h1>
      <div>左边栏</div>
      {props.children}
    </div>
  );
}
