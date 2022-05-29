import React from "react";
import "./App.css";
import itemsList from "./items.json";

class ProductList extends React.Component {
  render() {
    const items = itemsList.sort(function (a, b) {
      return a.category.localeCompare(b.category);
    });
    let searchText = this.props.state.name;
    let inStock = this.props.state.inStock;
    let listItems = [];
    let k = 0;
    let currentCategory = "";
    for (let i = 0; i < items.length; i++) {
      if (!items[i].name.includes(searchText)) continue;

      if (!inStock || (inStock && items[i].stocked)) {
        if (items[i].category !== currentCategory) {
          currentCategory = items[i].category;
          listItems[k++] = (
            <h3 key={items[i].category} className="category">
              {currentCategory}
            </h3>
          );
        }
        listItems[k++] = (
          <tr
            key={items[i].name}
            className={items[i].stocked === true ? "inStock" : "outOfStock"}
          >
            <td>{items[i].name}</td>
            <td>{items[i].price}</td>
          </tr>
        );
      }
    }
    if (listItems.length === 0) {
      return <h1>No matching items!</h1>;
    }
    return (
      <table>
        <thead>
          <tr>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Price</h2>
            </th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      inStock: false,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form className="input">
          <label>
            <input
              name="name"
              type="text"
              placeholder="Search..."
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Only in stock:
            <input
              name="inStock"
              type="checkbox"
              checked={this.state.inStock}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <ProductList state={this.state} />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <SearchBar />;
  }
}

export default App;
