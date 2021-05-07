import React, { Component } from "react";

class ProductCard extends Component {

    render() {
        return (
            <div className="card">
                <form>
                    <div className="card-body">
                        <h5 className="card-title">Product Details</h5>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Product Name :</label>
                            <label className="col-sm-3 col-form-label col-form-label-md">{this.props.product.name} </label>
                            <label className="col-sm-3 col-form-label col-form-label-md">Product Status :</label>
                            <label className="col-sm-3 col-form-label col-form-label-md">{this.props.product.product_status} </label>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Tracking POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" value={this.props.product.tracking_poc} >
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">FeedBack POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" value={this.props.product.feedback_poc} >
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Ordering POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" value={this.props.product.ordering_poc} >
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">Quality POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" value={this.props.product.quality_by} >
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label col-form-label-md">Payment POC :</label>
                            <div className="col-sm-3 dropdown">
                                <select className="custom-select" value={this.props.product.payment_poc} >
                                    <option>Select..</option>
                                    {this.props.refval.map((val) => (<option value={val}>{val}</option>))};
                            </select>
                            </div>
                            <label className="col-sm-3 col-form-label col-form-label-md">Total :</label>
                            <label className="col-sm-3 col-form-label col-form-label-md">{this.props.product.total} </label>
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