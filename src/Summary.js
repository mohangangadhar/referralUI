import React, { Component } from "react";
import ProductCard from './ProductCard.js';
import { NotificationManager } from 'react-notifications';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.searchOrder = this.searchOrder.bind(this);
    this.updateReferral = this.updateReferral.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.state = {
      todos: [],
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
  updateReferral(event) {
    const { orderInfo } = { ...this.state };
    const currentState = orderInfo;
    const { name, value } = event.target;
    currentState[name] = value;
    currentState["type"] = "order";
    this.setState({
      orderInfo: currentState
    });
  }
  searchOrder() {
    fetch(this.state.url + '/' + this.state.inputValue)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          orderVal: JSON.parse(data.order_result).Items,
          orderInfo: JSON.parse(data.order_result).Items[0],
          productVal: JSON.parse(data.product_result).Items
        });
      })
      .catch(console.log)
  }
  saveOrder() {
    console.log(this.state.orderInfo);
    fetch(this.state.url, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(this.state.orderInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        NotificationManager.success('You changes have been updated!', 'Successful!', 1000);
      })
      .catch((error) => {
        console.error('Error:', error);
        NotificationManager.error('Error while making your changes, contact support!', 'Error!');
      });
  }
  render() {
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
          {this.state.orderVal.map((order) => (
            <div className="card">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label col-form-label-md">Order No :</label>
                  <label className="col-sm-4 col-form-label col-form-label-md">{order.orderId}</label>
                  <label className="col-sm-2 col-form-label col-form-label-md">Name :</label>
                  <label className="col-sm-4 col-form-label col-form-label-md">{order.custFirstName} {order.custLastName} </label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label col-form-label-md">Email :</label>
                  <label className="col-sm-4 col-form-label col-form-label-md">{order.email}</label>
                  <label className="col-sm-2 col-form-label col-form-label-md">Phone :</label>
                  <label className="col-sm-4 col-form-label col-form-label-md">{order.phone} </label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label col-form-label-md">Total :</label>
                  <label className="col-sm-4 col-form-label col-form-label-md">
                    <button className="btn btn-info btn-disabled">{order.total}</button>
                  </label>
                  <label className="col-sm-2 col-form-label col-form-label-md">Referral  :</label>

                  {order.referral.length < 0 ?
                    <label className="col-sm-4 col-form-label col-form-label-md"> {order.referral} </label> :
                    (<div className="col-sm-3 dropdown">
                      <select name="referral" className="custom-select" value={this.state.orderInfo.referral} onChange={this.updateReferral} >
                        <option>Select..</option> {this.state.refval.map((val) => (<option value={val}>{val}</option>))};
                      </select>
                    </div>)}
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label col-form-label-md">Comments :</label>
                  <input type="text" className="col-sm-9 form-control"></input>
                </div>
                <div className="form-group row">
                  <button type="button" onClick={this.saveOrder} className="col-sm-2 col-form-label btn btn-primary btn-md">Save</button>
                </div>
              </div>
            </div>
          ))}
          {/* "orderId": 5848,
 "id": "ef7b899a-1377-4ab1-bacc-f22db6f68481",
 "tracking_poc": "Vishnu",
 "feedback_poc": "Vishnu",
 "delivered_by": "Vishnu",
 "product_status": "Delivered",
 "total": "1150",
 "createdAt": 5,
 "ordering_poc": "Vishnu",
 "quality_by": "Mohan",
 "payment_poc": "Mohan",
 "name": "Alphonso Devgad - 1 Dozen",
 "packed_by": "queen",
 "updatedAt": 5,
 "productId": 4024 */}
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