import React, {Component} from "react"
import axios from 'axios';
class Main extends Component {
  state = {
    dolarVen: null,
    dolarPeso: null,
    pesoVen: null
  }
  async componentDidMount() {
    try {
      const response = await axios.get("https://s3.amazonaws.com/dolartoday/data.json");
      const peso = await axios.get("https://api.exchangeratesapi.io/latest?base=USD");
      this.setState({dolarVen: response.data.USD.transferencia, dolarPeso: peso.data.rates.MXN });
      const pesoVen = (this.state.dolarVen / this.state.dolarPeso)
      this.setState({pesoVen})
      
    }catch(error) {
      console.log(error)
    }
  }

  render() {
    let pesoVen = null;
    if(this.state.pesoVen) {
       pesoVen = this.state.pesoVen.toFixed(2)
    }
    return(
      <div>
        <p>1 Dolar son {this.state.dolarVen} bolivares</p>
        <p>1 Peson son {pesoVen} bolivares</p>
      </div>
    )
  }
}

export default Main;