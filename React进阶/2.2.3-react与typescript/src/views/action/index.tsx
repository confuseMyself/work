import * as React from 'react';

interface onChange {
  (value: string): void
}

interface onAdd {
  (value: string): void
}

interface IProps {
  value: string,
  onChange: onChange,
  onAdd: onAdd
}


class Action extends React.Component<IProps, Object> {
  public render() {
    const {
      value,
      onChange,
      onAdd
    } = this.props
    return (
      <div className="action">
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

export default Action;
