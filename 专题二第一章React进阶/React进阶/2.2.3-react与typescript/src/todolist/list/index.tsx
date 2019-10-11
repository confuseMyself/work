import * as React from 'react';
import {FriendItem} from "../types";

interface onDel {
  (index: number): void
}

interface IProps {
  list: Array<FriendItem>,
  onDel: onDel
}

class List extends React.Component<IProps>{
  render() {
    const {
      list,
      onDel
    } = this.props
    return (
      <div>
        {list.map((item: FriendItem,index: number) => <div>
          {item.name} <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onDel(index)
        }}>-</button>
        </div>)}
      </div>
    );
  }
}

export default List
