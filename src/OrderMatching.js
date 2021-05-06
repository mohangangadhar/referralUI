import React, { Component } from "react";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        todos: [],
        orderId: "",
        name: "",
        phone: "",
        order_status: "",
        referrer: "",
        selctName: "",
        selected: '',
        refval: [" Vishnu", " Kiran", " Mohan", " Mayur", " Navya", " Nilesh", " Swetha", " Kavya", " Sampath", " Jeevamrut", " Sonali"]
    }

    componentDidMount() {
        fetch('http://192.168.29.12:4300/api/product/open')
            .then(res => res.json())
            .then((data) => {
                this.setState({ todos: data, selected: '' })
            })
            .catch(console.log)
    }
    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }
    handleChange(event) {
        let selectedValue = event.target.value.split(" ");
        var data = {
            orderId: this.state.todos[selectedValue[0]].orderId,
            name: this.state.todos[selectedValue[0]].name,
            phone: this.state.todos[selectedValue[0]].phone,
            order_status: this.state.todos[selectedValue[0]].order_status,
            refferal: selectedValue[1],
            amount: this.state.todos[selectedValue[0]].amount,
            incentive: this.state.todos[selectedValue[0]].incentive,
            id: this.state.todos[selectedValue[0]].id
        }

        fetch('http://192.168.29.12:4300/api/product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        }).then(response => {
            this.componentDidMount();
            response.json();
        }).then(result => {
            console.log('Success:');
        }).catch(error => { console.error('Error:', error); });
    }
    handleClear = (e) => {
        this.setState({ selected: "" })
    }
    render() {
        return (
            <div className="container">
                <h1>Orders</h1>
                <div className="card">
                    <div className="card-body bg-info">
                        <div className="row">
                            <div className="col-sm h4"> Order ID </div>
                            <div className="col-sm h4"> Name </div>
                            <div className="col-sm h4"> Phone </div>
                            <div className="col-sm h4"> Status </div>
                            <div className="col-sm h4"> Referrer </div>
                        </div>
                    </div>
                </div>
                {this.state.todos.map((todo, i) => (
                    <div className="card">
                        <div className="card-body">
                            <div className="row" key={i}>
                                <div className="col-sm"> {todo.orderId} </div>
                                <div className="col-sm"> {todo.name} </div>
                                <div className="col-sm"> {todo.phone} </div>
                                <div className="col-sm"> {todo.order_status} </div>
                                <div className="col-sm">
                                    <div className="dropdown">
                                        <select className="custom-select" value={this.state.selected} onChange={this.handleChange.bind(this)}>
                                            <option>Select..</option>
                                            {this.state.refval.map((val) => (
                                                <option value={i + val}>{val}</option>
                                            ))};
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Summary;