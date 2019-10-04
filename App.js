class App extends React.Component {
  state = {
    availableProducts: 9,
    shoppingCart: 0
  };

  handleMathClick = type => {
    if (type === "addition") {
      this.setState(prevState => ({
        shoppingCart: prevState.shoppingCart + 1
      }));
    } else if (type === "subtraction") {
      this.setState(prevState => ({
        shoppingCart: prevState.shoppingCart - 1
      }));
    }
  };

  handleBuy = () => {
    this.setState({
      availableProducts: this.state.availableProducts - this.state.shoppingCart,
      shoppingCart: 0
    });
  };

  render() {
    const { shoppingCart, availableProducts } = this.state;

    return (
      <React.Fragment>
        <MathButton
          disabled={shoppingCart === 0 ? true : false}
          type="subtraction"
          name="-"
          click={this.handleMathClick}
        />

        <ResultPanel count={shoppingCart} />

        <MathButton
          disabled={
            this.state.shoppingCart === availableProducts ? true : false
          }
          type="addition"
          name="+"
          click={this.handleMathClick}
        />

        <BuyButton
          shoppingCart={shoppingCart}
          name="buy"
          click={this.handleBuy}
        />
      </React.Fragment>
    );
  }
}

const MathButton = props => {
  return (
    <button disabled={props.disabled} onClick={() => props.click(props.type)}>
      {props.name}
    </button>
  );
};

const BuyButton = props => {
  return (
    props.shoppingCart > 0 && (
      <button onClick={props.click}> {props.name} </button>
    )
  );
};

const ResultPanel = props => {
  const style = props.count === 0 ? { opacity: 0.3 } : {};
  return <span style={style}>{props.count}</span>;
};

ReactDOM.render(<App />, document.getElementById("root"));
