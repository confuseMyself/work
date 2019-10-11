import * as React from 'react';

interface onAdd {
  (index: string): void
}

interface onChange {
  (index: string): void
}

interface IProps {
  value: string,
  onAdd: onAdd,
  onChange: onChange
}

class Action extends React.Component<IProps>{
  render() {
    const {
      value,
      onAdd,
      onChange
    } = this.props
    return (
      <div>
        <input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
          onChange(e.target.value)
        }}/>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onAdd(value)
        }}>add</button>
      </div>
    );
  }
}

export default Action
