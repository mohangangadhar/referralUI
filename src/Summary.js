import React, { Component } from "react";

class Summary extends Component {
  state = {
    todos: [],
    dataVal: {
      "order_result": "{\"Items\":[{\"custLastName\":\"Peri\",\"orderId\":5848,\"total\":\"1250\",\"comments\":\"yay!, it worked\",\"createdAt\":5,\"incentive\":93.75,\"email\":\"nhamperi@gmail.com\",\"referral\":\"Mohan did it\",\"paid\":\"Yup, I paid\",\"deliveryCharge\":\"100\",\"updatedAt\":5,\"id\":\"76aa6e3c-01ba-46d6-a662-6f9c00058fce\",\"custFirstName\":\"Venkat\",\"phone\":\"8106801313\",\"paymentType\":\"Cash on delivery\",\"customerId\":186}],\"Count\":1,\"ScannedCount\":1}",
      "product_result": "{\"Items\":[{\"tracking_poc\":\"Vishnu\",\"feedback_poc\":\"Vishnu\",\"delivered_by\":\"Vishnu\",\"product_status\":\"Delivered\",\"orderId\":5848,\"total\":\"1150\",\"createdAt\":5,\"ordering_poc\":\"Vishnu\",\"quality_by\":\"Mohan\",\"payment_poc\":\"Mohan\",\"name\":\"Alphonso Devgad - 1 Dozen\",\"packed_by\":\"queen\",\"updatedAt\":5,\"id\":\"ef7b899a-1377-4ab1-bacc-f22db6f68481\",\"productId\":4024}],\"Count\":1,\"ScannedCount\":1}"
    },
    orderVal: [],
    productVal: []
  }
  componentWillUnmount() {
    console.log(JSON.parse(this.state.dataVal.order_result));
  }
  componentDidMount() {

    fetch('https://dejhy5z2ec.execute-api.us-east-1.amazonaws.com/order/5848')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          orderVal: JSON.parse(this.state.dataVal.order_result).Items,
          productVal: JSON.parse(this.state.dataVal.product_result).Items
        });
      })
      .catch(console.log)
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
          <h1>Refferal Summary</h1>
          {this.state.orderVal.map((todo) => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{todo.orderId}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  No Of Orders = {todo.orderId}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Refferer = {todo.custFirstName}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Total Amount Earned = Rs {todo.incentive} /-
                    </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Summary;