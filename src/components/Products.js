import React, { Component } from "react";
import { Table } from "react-materialize";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

class Products extends Component {
  state = {
    products: [],
    currentProduct: [],
    productCardVisible: false,
    isClicked: false,
    search: ''
  };

  async componentDidMount() {
    const response = await Axios.get(
      "https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data"
    );
    const products = response.data.products;
    this.setState({ products });
  }

  handleRowDetails = id => {
    const filteredProduct = this.state.products.filter(
      product => product.id === id
    );
    this.setState({
      currentProduct: filteredProduct,
      productCardVisible: true
    });
  };

  handleSort = (value) => {
    const filteredColumn = this.state.products.sort((a, b) => {
      const nameAType = a.product_type.toLowerCase();
      const nameBType = b.product_type.toLowerCase();
      const nameAVendor = a.vendor.toLowerCase();
      const nameBVendor = b.vendor.toLowerCase();
      const nameATitle = a.title.toLowerCase();
      const nameBTitle = b.title.toLowerCase();
   if (value === 'type') {
      if (nameAType < nameBType) {
        return 1;
      }
      if (nameAType > nameBType) {
        return -1;
      }
      return 0;
    } else if (value === 'vendor') {
        if (nameAVendor < nameBVendor) {
            return 1;
          }
          if (nameAVendor > nameBVendor) {
            return -1;
          }
          return 0;
    } else if (value === 'title') {
        if (nameATitle < nameBTitle) {
            return 1;
        }
        if (nameATitle > nameBTitle) {
            return -1;
        }
        return 0;
    }
    return null;
    });
    
    this.setState({
      isClicked: !this.state.isClicked,
      products: this.state.isClicked ? filteredColumn : filteredColumn.reverse()
    });
  };

  updateSearch = (event) => {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render() {
    let filteredProducts = this.state.products.filter(
        (product) => {
            return product.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
    )

    return (
      <div>
        <div>
          {this.state.productCardVisible ? (
            <Container>
              <Row>
                <Col className="card-holder" md={{ span: 4, offset: 4 }}>
                  Card Goes Here
                  <div className="card">
                    <div className="card-image">
                      <img
                        src={this.state.currentProduct[0].image.src}
                        alt="product-img"
                      />
                    </div>

                    <div className="card-details">
                      <p>{this.state.currentProduct[0].title}</p>
                      <p>{this.state.currentProduct[0].product_type}</p>
                      <p>{this.state.currentProduct[0].vendor}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : null}
        </div>
        <div className="products-table">
          <Container>
            <input type="text" placeholder="Search product name..."
                value={this.state.search}
                onChange={this.updateSearch} />
          <button
              className="btn btn-sm btn-primary text-capitalized"
              onClick={() => this.handleSort('title')}
            >
              Sort by name
            </button>{" "}  
            <button
              className="btn btn-sm btn-primary text-capitalized"
              onClick={() => this.handleSort('type')}
            >
              Sort by type
            </button>{" "}
            <button
              className="btn btn-sm btn-primary text-capitalized"
              onClick={() => this.handleSort('vendor')}
            >
              Sort by vendor
            </button>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Product Type</th>
                  <th>Sizes</th>
                  <th>Vendor</th>
                  <th>Tags</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => (
                  <tr
                    key={product.id}
                    onClick={() => this.handleRowDetails(product.id)}
                  >
                    <td>{product.title}</td>
                    <td>{product.product_type}</td>
                    <td>{product.options[0].values.toString().split(" ")}</td>
                    <td>{product.vendor}</td>
                    <td>{product.tags.split(",").slice(4, 9)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default Products;