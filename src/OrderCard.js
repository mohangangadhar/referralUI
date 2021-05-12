import React, { Component } from "react";
import { NotificationManager } from "react-notifications";

class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.updateReferral = this.updateReferral.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.state = {
            orderInfo: this.props.orderInfo
        }
    }
    updateValue(event) {
        const { orderInfo } = { ...this.state };
        const currentState = orderInfo;
        const { name, value } = event.target;
        currentState[name] = value;
        this.setState({
            orderInfo: currentState
        });

    }
    saveOrder() {
        console.log(this.state.orderInfo);
        fetch(this.props.url, {
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
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-md">Order No :</label>
                        <label className="col-sm-2 col-form-label col-form-label-md">{this.state.orderInfo.orderId}</label>
                        <label className="col-sm-1 col-form-label col-form-label-md">Name :</label>
                        <label className="col-sm-3 col-form-label col-form-label-md">{this.state.orderInfo.custFirstName} {this.state.orderInfo.custLastName} </label>
                        <label className="col-sm-1 col-form-label col-form-label-md">Email :</label>
                        <label className="col-sm-3 col-form-label col-form-label-md">{this.state.orderInfo.email}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-md">Referral :</label>
                        {this.state.orderInfo.referral.length < 0 ?
                            <label className="col-sm-2 col-form-label col-form-label-md"> {this.state.orderInfo.referral} </label> :
                            (<div className="col-sm-2 dropdown">
                                <select name="referral" className="custom-select" value={this.state.orderInfo.referral} onChange={this.updateReferral} >
                                    <option>Select..</option> {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                                </select>
                            </div>)}
                        <label className="col-sm-1 col-form-label col-form-label-md">Phone :</label>
                        <label className="col-sm-3 col-form-label col-form-label-md">{this.state.orderInfo.phone} </label>
                        <label className="col-sm-1 col-form-label col-form-label-md">Total :</label>
                        <label className="col-sm-2 col-form-label col-form-label-md">
                            <button className="btn btn-info btn-disabled"> Rs {this.state.orderInfo.total} /-</button>
                        </label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-md">Order Status :</label>
                        <div className="col-sm-3 dropdown">
                            <select className="custom-select" name="product_status" value={this.state.orderInfo.product_status} onChange={this.updateValue} >
                                <option>Select..</option>
                                {this.props.item_status.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-md">Comments :</label>
                        <input type="text" name="comments" className="col-sm-8 form-control" onChange={this.updateValue}></input>
                    </div>
                    <div className="form-group row">
                        <button type="button" onClick={this.saveOrder} className="col-sm-2 col-form-label btn btn-primary btn-md">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderCard;