import React from "react";
import ReactDOM from "react-dom";

import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./Optionmodal";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      this.setState(() => ({ options: options }));
      console.log("Loading data");
    } catch (error) {
      // do nothing
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.lenght !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("Saving data");
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Enter Valid Value to Add Item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This Option Already Exists";
    }

    this.setState((prevstate) => ({
      options: prevstate.options.concat(option),
    }));
  };

  handleDelteOption = (optionToRemove) => {
    this.setState((prevstate) => ({
      options: prevstate.options.filter((option) => {
        return optionToRemove !== option;
      }),
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  render() {
    const title = "Indecision App";
    const subtitle = "Put your life in the Hand of computer!";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOption={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDelteOption={this.handleDelteOption}
            />

            <AddOption handleAddOption={this.handleAddOption} />
          </div>
          <OptionModal
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
          />
        </div>
      </div>
    );
  }
}
