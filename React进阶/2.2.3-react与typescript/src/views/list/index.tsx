import * as React from 'react';
import {
  StudentItem
} from '../../interface'

interface onDel {
  (string: number): void
}

interface IProps {
  list: Array<StudentItem>,
  onDel: onDel
}





class List extends React.Component<IProps> {
  public render() {
    const {
      list,
      onDel
    } = this.props
    return (
      <div className="list">
        <h2>studetn-list</h2>
        {
          list.map((item:StudentItem,index:number) => <div>
            <span>{item.name}: {item.age}</span><button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onDel(index)
          }}>-</button>
          </div>)
        }
      </div>
    );
  }
}

export default List;
