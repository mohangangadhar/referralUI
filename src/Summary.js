import React, { Component } from "react";
import ProductCard from './ProductCard.js';
import OrderCard from './OrderCard.js';
import Spinner from './spinner.js';


class Summary extends Component {
  constructor(props) {
    super(props);
    this.searchOrder = this.searchOrder.bind(this);
    this.state = {
      loading: false,
      orderVal: [],
      productVal: [],
      inputValue: '',
      url: "https://evening-waters-68895.herokuapp.com/https://6fu3ib3a7f.execute-api.us-east-1.amazonaws.com/order",
      referral: '',
      refval: ["Vishnu", "Kiran", "Mohan", "Mayur", "Navya", "Nilesh", "Swetha", "Kavya", "Sampath", "Jeevamrut", "Sonali"],
      product_status: ["Delivered", "Not Delivered", "Out For Delivery", "On Hold", "Cancelled", "No Stock"],
      orderInfo: {
        orderId: "",
        id: "",
        comments: "yay!, it worked",
        incentive: 93.75,
        referral: "Mohan did it",
        paid: "Yup, I paid",
        paymentType: "Cash on delivery"
      }
    }
  }
  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  searchOrder() {
    this.setState({ loading: true });
    fetch(this.state.url + '/' + this.state.inputValue)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          orderVal: JSON.parse(data.order_result).Items,
          orderInfo: JSON.parse(data.order_result).Items[0],
          productVal: JSON.parse(data.product_result).Items,
          loading: false
        });
      })
      .catch(console.log)
  }

  render() {
    const orderVal = this.state.orderVal;
    const loading = this.state.loading;
    let orders;
    if (orderVal === null || loading) {
      orders = <Spinner />;
    } else {
      if (orderVal) {
        orders = orderVal.map((order, index) => (
          <OrderCard orderInfo={order} index={index} key={index}
            refval={this.state.refval}
            url={this.state.url} />
        ))
      } else {
        orders = <h3 className="text-center">There is no order recored!</h3>;
      }
    }

    return (
      <div className="container">
        <div className="col-xs-12">
          <h2>Referal Summary</h2>
          <div className="card">
            <div className="card-body">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-md">Order No  :</label>
                <input className="col-sm-2 form-control" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
                <div className="col-sm-2">
                  <button type="submit" onClick={this.searchOrder} className="btn btn-primary form-control" id="button-addon2">Search</button>
                </div>
              </div>
            </div>
          </div>
          {orders}
          {this.state.productVal.map((product, index) => (
            <ProductCard product={product} index={index}
              key={index}
              refval={this.state.refval}
              item_status={this.state.product_status}
              url={this.state.url} />
          ))}

        </div>
      </div>
    );
  }
}

export default Summary;