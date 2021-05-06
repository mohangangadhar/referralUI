import React, { Component } from "react";

class Summary extends Component {
    state = {
        todos: []
    }
    componentDidMount() {
        fetch('http://192.168.29.12:4300/api/refsum')
            .then(res => res.json())
            .then((data) => {
                this.setState({ todos: data })
                console.log(this.state.todos)
            })
            .catch(console.log)
    }
    render() {
        return (
            <div className="container">
            <div className="col-xs-12">
              <h1>Refferal Summary</h1>
              {this.state.todos.map((todo) => (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      No Of Orders = {todo.orders}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                    Refferer = {todo.refferal}
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