
import styles from './index.css';


class Title extends React.Component{
  render() {
    console.log(this.props.name)
    return (
      <div>
        title
      </div>
    );
  }

}

class List extends React.Component{

  render() {
    console.log(this.props.children)
    let T = React.cloneElement(this.props.children, {name:'siri',age:'b'})
    return (
      <div>
        {T}
      </div>
    );
  }

}

export default function() {
  return (
    <div className={styles.normal}>
      <List>
        <Title/>
      </List>
    </div>
  );
}
