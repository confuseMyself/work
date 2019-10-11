import React from 'react';
import ReactDOM from 'react-dom';

// 创建context实例，生产-消费者模式
// context 新的api 生产-消费模式 避免了ShouldComponentUpdate的冲突 
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white',
  func: function () {}
});

class Header extends React.Component {
  render() {
    return (
      <Title>
        撒旦法所发生的发生的发生的
      </Title>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      // 消费者
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{ background: context.background, color: context.color }}>
            <button onClick={()=>{context.func("aasdfas")}}>点击向祖父传值</button>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      background: "red",
      color: "green",
      buttonContent:"点击换肤",
    }
  }
  clickButton = () => {
    this.setState({
      background: "yellow",
      color: "red"
    })
  }
  passData = (name,...rest) => {
    this.setState({
      buttonContent:name
    })
  }
  render() {
    let { background, color,buttonContent } = this.state;
    return (
      <div className="App">
        <button className="App__button"
          onClick={this.clickButton}
        >{buttonContent}</button>
        {/* 生产者 */}
        <ThemeContext.Provider value={{ background: background, color: color, func: this.passData }}>
          <Header />
        </ThemeContext.Provider>
      </div>

    );
  }
}
export default App