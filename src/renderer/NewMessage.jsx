import React from "react";

const FORM_STYLE = {
    display: "flex"
};

const BUTTON_STYLE = {
    marginLeft: 10
};

export default class NewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "" };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({ message: e.target.value });
    }

    handleOnSubmit(e) {
        const { onMessagePost } = this.props;
        if (!onMessagePost || !this.state.message.length) {
            return;
        }
        onMessagePost(this.state.message);
        this.setState({ message: "" });
        e.preventDefault();
    }

    render() {
        return (
            <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.state.message}
                />
                <button className="btn btn-large btn-primary" style={BUTTON_STYLE}>POST</button>
            </form>
        );
    }
}
