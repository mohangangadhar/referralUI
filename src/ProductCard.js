import React, { Component } from "react";

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.state = {
            product: this.props.product
        }
    }
    updateValue(event) {
        const { product } = { ...this.state };
        const currentState = product;
        const { name, value } = event.target;
        currentState[name] = value;
        console.log(name);
        console.log(value);
        console.log(currentState);
        currentState["type"] = "product";
        this.setState({
            product: currentState
        });
    }

    render() {
        return (
            <div className="card">
                <form>
                    <div className="card-body">
                        <h5 className="card-title">Product Details</h5>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Product Name :</label>
                            <label className="col-sm-3 col-form-label col-form-label-md">{this.state.product.name} </label>
                            <label className="col-sm-3 col-form-label col-form-label-md">Product Status :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="product_status" value={this.state.product.product_status} onChange={this.updateValue} >
                                    <option>Select..</option>
                                    {this.props.item_status.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Tracking POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="tracking_poc" value={this.state.product.tracking_poc} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">FeedBack POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="feedback_poc" value={this.state.product.feedback_poc} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Ordering POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="ordering_poc" value={this.state.product.ordering_poc} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">Quality POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="quality_by" value={this.state.product.quality_by} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Payment POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" name="payment_poc" value={this.state.product.payment_poc} onChange={this.updateValue}>
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">Total :</label>
                            <label className="col-sm-3 col-form-label col-form-label-md">{this.state.product.total} </label>
                        </div>
                        <div className="form-group row">
                            <button type="button" className="col-sm-2 col-form-label btn btn-primary btn-md">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductCard;