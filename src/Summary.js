import React, { Component } from "react";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.searchOrder = this.searchOrder.bind(this);
    this.state = {
      todos: [],
      dataVal: {
        "order_result": "{\"Items\":[{\"custLastName\":\"Peri\",\"orderId\":5848,\"total\":\"1250\",\"comments\":\"yay!, it worked\",\"createdAt\":5,\"incentive\":93.75,\"email\":\"nhamperi@gmail.com\",\"referral\":\"Mohan did it\",\"paid\":\"Yup, I paid\",\"deliveryCharge\":\"100\",\"updatedAt\":5,\"id\":\"76aa6e3c-01ba-46d6-a662-6f9c00058fce\",\"custFirstName\":\"Venkat\",\"phone\":\"8106801313\",\"paymentType\":\"Cash on delivery\",\"customerId\":186}],\"Count\":1,\"ScannedCount\":1}",
        "product_result": "{\"Items\":[{\"tracking_poc\":\"Vishnu\",\"feedback_poc\":\"Vishnu\",\"delivered_by\":\"Vishnu\",\"product_status\":\"Delivered\",\"orderId\":5848,\"total\":\"1150\",\"createdAt\":5,\"ordering_poc\":\"Vishnu\",\"quality_by\":\"Mohan\",\"payment_poc\":\"Mohan\",\"name\":\"Alphonso Devgad - 1 Dozen\",\"packed_by\":\"queen\",\"updatedAt\":5,\"id\":\"ef7b899a-1377-4ab1-bacc-f22db6f68481\",\"productId\":4024}],\"Count\":1,\"ScannedCount\":1}"
      },
      orderVal: [],
      productVal: [],
      inputValue: '',
      url: "https://dejhy5z2ec.execute-api.us-east-1.amazonaws.com/order/",
      referral: ''
    }
  }
  componentWillUnmount() {
    console.log(JSON.parse(this.state.dataVal.order_result));
  }
  componentDidMount() {

    // fetch('https://dejhy5z2ec.execute-api.us-east-1.amazonaws.com/order/5848')
    //   .then(res => res.json())
    //   .then((data) => {
    //     this.setState({
    //       orderVal: JSON.parse(data.order_result).Items,
    //       productVal: JSON.parse(data.product_result).Items
    //     });
    //   })
    //   .catch(console.log)
  }
  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  updateReferral(event) {
    console.log(event.target.value);
    this.setState({
      referral: event.target.value
    });
  }
  searchOrder() {
    fetch(this.state.url + this.state.inputValue)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          orderVal: JSON.parse(data.order_result).Items,
          productVal: JSON.parse(data.product_result).Items
        });
      })
      .catch(console.log)
    console.log(this.state.inputValue);
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
          <h2>Referal Summary</h2>
          <div className="card">
            <div className="card-body">
              <div className="input-group mb-3">
                <h5 className="card-title">Order No </h5>
                <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
                <button type="submit" onClick={this.searchOrder} className="btn btn-outline-secondary" id="button-addon2">Search</button>
              </div>
            </div>
          </div>
          {/* "orderId": 5848,
 "id": "76aa6e3c-01ba-46d6-a662-6f9c00058fce",
 "custLastName": "Peri",
 "total": "1250",
 "comments": "yay!, it worked",
 "createdAt": 5,
 "incentive": 93.75,
 "email": "nhamperi@gmail.com",
 "referral": "Mohan did it",
 "paid": "Yup, I paid",
 "deliveryCharge": "100",
 "updatedAt": 5,
 "custFirstName": "Venkat",
 "phone": "8106801313",
 "paymentType": "Cash on delivery",
 "customerId": 186 */}
          {this.state.orderVal.map((todo) => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order No: {todo.orderId}</h5>
                <h6 className="card-subtitle mb-2 text-muted"> Name = {todo.custFirstName} {todo.custLastName}  </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Email = {todo.email}    Phone = {todo.phone} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Total Amount = {todo.total} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> referral
                {todo.referral.length > 0 ? todo.referral :
                    <input value={this.state.referral} onChange={evt => this.updateReferral(evt)} />}
                </h6>
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
          {this.state.productVal.map((todo) => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Product Details</h5>
                {/* <h5 className="card-title">Order No: {todo.orderId}</h5> */}
                <h6 className="card-subtitle mb-2 text-muted"> Product Name = {todo.name} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Product Status = {todo.product_status} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Tracking POC = {todo.tracking_poc} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> FeedBack POC = {todo.feedback_poc} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Ordering POC = {todo.ordering_poc} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> FeedBack POC = {todo.feedback_poc} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Quality POC  = {todo.quality_by} </h6>
                <h6 className="card-subtitle mb-2 text-muted"> Payment POC  = {todo.payment_poc} </h6>

                <h6 className="card-subtitle mb-2 text-muted"> Total Amount = {todo.total} </h6>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Summary;