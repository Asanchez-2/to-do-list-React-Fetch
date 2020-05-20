import React, { useContext } from "react";

//include bootstrap npm library into the bundle
import "bootstrap";

import { Context } from "../store/appContext";

//create your first component
export class InputToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "", //empty string text by default
			messages: [] //empty array by default
		};

		this.handleChange = this.handleChange.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		//console.log("Propiedades", this.context);
	}

	handleChange(event) {
		this.setState({ input: event.target.value });
	}

	keyPressed(event) {
		if (event.key === "Enter" && event.target.value !== "") {
			this.submitMessage();
			event.preventDefault();
		}
	}

	submitMessage() {
		this.setState({ messages: [...this.state.messages, this.state.input] }); // [...num1, num2] sirve para ...num1 donde lo quiero meter, num2 lo que quiero meter.
		this.setState({ input: "" });
	}

	//deleteTask(i) {
	//const messages = this.state.messages.filter((_, index) => index !== i);
	//this.setState({ messages });
	//}

	deleteTask(item) {
		const newMessages = this.state.messages.filter(messages => {
			return messages !== item; //comparamos cada item que queremos eliminar con cada item del array "messages".
		});
		this.setState({ messages: [...newMessages] });
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div className="container">
						<h2 className="title">
							To Do List
							<i className="fas fa-tasks" />
						</h2>
						<button type="button" className="btn btn-primary" onClick={null}>
							Primary
						</button>
						<input
							className="divInput"
							placeholder="What´s next to be done?"
							onChange={this.handleChange}
							onKeyPress={this.keyPressed}
							value={this.state.input}
						/>
						<ul className="list-group">
							{this.state.messages.map((item, i) => (
								<li className="list-group-item d-flex" key={i}>
									{item}
									<i
										//onClick={() => this.deleteTask(i)}
										onClick={e => this.deleteTask(item)}
										className="far fa-trash-alt ml-auto"
									/>
								</li>
							))}
							<div className="taskCounter">
								You have <strong className="length">{this.state.messages.length} tasks to do </strong>
							</div>
						</ul>
					</div>
				)}
			</Context.Consumer>
		);
	}
}
InputToDo.contextType = Context;
