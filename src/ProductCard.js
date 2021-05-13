import React, { Component } from "react";
import { NotificationManager } from 'react-notifications';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.state = {
            product: this.props.product
        }
    }
    updateValue(event) {
        const { product } = { ...this.state };
        const currentState = product;
        const { name, value } = event.target;
        currentState[name] = value;
        this.setState({
            product: currentState
        });

    }

    saveProduct() {
        const { product } = { ...this.state };
        const currentState = product;
        currentState["type"] = "product";
        let key = this.props.product_status_key[this.state.product.product_status];
        currentState[key] = this.state.product.person_name;
        console.log(this.state.product);
        this.setState({
            product: currentState
        });

        fetch(this.props.url, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(this.state.product),
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
        let productName = this.state.product.name + " - ";
        if (this.state.product.Rejected) {
            productName += " Rejected By " + this.state.product.Rejected;
        } else if (this.state.product.Returned) {
            productName += " Returned By " + this.state.product.Returned;
        } else if (this.state.product.delivered) {
            productName += " Delivered By " + this.state.product.delivered;
        } else if (this.state.product.outfordelivery) {
            productName += " Out For Delivery By " + this.state.product.outfordelivery;
        } else if (this.state.product.shipped) {
            productName += " Shipped By " + this.state.product.shipped;
        } else if (this.state.product.packed) {
            productName += " Packed By " + this.state.product.packed;
        } else if (this.state.product.picked) {
            productName += " Picked By " + this.state.product.picked;
        }

        return (
            <div className="card">
                <form>
                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-sm-10 col-form-label col-form-label-md">
                                <p className="font-weight-bold">{productName} </p>
                            </label>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-md">Ordered :</label>
                            <label className="col-sm-1 col-form-label col-form-label-md">{this.state.product.ordered_quantity} </label>
                            <label className="col-sm-2 col-form-label col-form-label-md">Delivered :</label>
                            <label className="col-sm-1 col-form-label col-form-label-md">{this.state.product.delivered_quantity} </label>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-md">Product Status :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="product_status" value={this.state.product.product_status} onChange={this.updateValue} >
                                    <option>Select..</option>
                                    {this.props.item_status.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-1  col-form-label col-form-label-md">Person :</label>
                            <div className="col-sm-2 dropdown">
                                <select className="custom-select" name="person_name" value={this.state.product.person_name} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <div>
                                <label className="col-sm-1  col-form-label col-form-label-md">Qty :</label>
                                <input type="text" name="delivered_quantity" value={this.state.product.delivered_quantity} className="col-sm-8 form-control" onChange={this.updateValue}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <button type="button" className="col-sm-2 col-form-label btn btn-primary btn-md" onClick={this.saveProduct}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductCard;