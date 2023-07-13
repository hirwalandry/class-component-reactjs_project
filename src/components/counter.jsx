//we include React to make buble compile html element and present it into real DOM  and be printed to the browser  behind scene uses React.createElement
import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("is", prevProps);
    console.log("is", prevState);
  }
  //state is most and usable object in component that helps to store data to render into browser
  //   constructor() {
  //     super();
  //     this.handlerIncrement = this.handlerIncrement.bind(this);
  //   }
  //here is handler method which will help us to handle events and unlike other method we not gonna call it we reference to this method inside render method and to render this is gonna render error because take us standard alone function and take this as window in react uses strict mode where doesn't use window global so bind this we will use constructor method keyword of class because we know function in javascript are objects and objects have methods here we use bind method to bind this note that you have to start with super keyword class to get constructor of parent class generate or user arrow function will render answer because it doesnt bind this, it inherit it

  //here is the method of component that helps to render data to browser
  render() {
    return (
      //here React.Fragment helps to imbend element children without using another div or the same element lined together
      //className is the same as class attribute in html, here in jsx is className because react uses plain javascript and class in javascript is keyword
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          {" "}
          <button
            onClick={() => {
              this.props.onIncrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => {
              this.props.onDecrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => {
              this.props.onDelete(this.props.counter.id);
            }}
            className="btn btn-danger btn-sm"
          >
            x
          </button>
        </div>
      </div>
    );
  }
  //check if there is no tag in the array and render message is there is none else render tags
  getTags() {
    const { tags } = this.state;
    return tags.length === 0 ? (
      <p>there is no tags</p>
    ) : (
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  // this method will append badge class in bootstrap a warning or primary to know if 0 is yellow or greater is blue
  getBadgeClasses() {
    const { value } = this.props.counter;
    let classes = "badge m-2 badge-";
    classes += value === 0 ? "warning" : "primary";
    return classes;
  }

  //this takes the code to another level helps to render the value of property to the state object where you can add other choices in this function to be printed out
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}
export default Counter;
