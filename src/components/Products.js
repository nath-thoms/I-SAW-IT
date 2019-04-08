import React, { Component } from 'react';
import { Table } from 'react-materialize';
import { Container, Row, Col } from 'react-bootstrap';
import * as API from '../API';
import Axios from 'axios';

class Products extends Component {

    
    state = {
        products: [],
        currentProduct: [],
        productCardVisible: false,
        isClicked: false,
        isSorted: false,
        type: []
    }
    

    async componentDidMount() {
        const response = await Axios.get('https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data')
        const products = response.data.products
        this.setState({products: products})
    }

    handleRowDetails = id => {
      const filteredProduct =  this.state.products.filter(product => product.id === id)
        this.setState({
            currentProduct: filteredProduct,
            productCardVisible: true
        }, () => console.log(filteredProduct[0].title, 'filter'))
    }

    handleSort = () => {
        const filteredColumn = this.state.products.map(product => product.title);
        this.setState({
            isClicked: !this.state.isClicked,
            type: this.state.isClicked ? filteredColumn.sort : filteredColumn.sort().reverse(),
            isSorted: true
        })
        console.log(filteredColumn.sort().reverse(), 'column');
    }

  render() {

    const {products, type, isSorted} = this.state;
    console.log(products);

      return (

        <div>
            This is the Products component

            <div>

                <h3>Selected Product Area</h3>



                { this.state.productCardVisible ? 
                
                <Container>
                    <Row>
                        <Col className="card-holder" md={{ span: 4, offset: 4 }}>
                            Card Goes Here

                            <div className="card">
                            
                                <div className="card-image">
                                    <img src={this.state.currentProduct[0].image.src} alt="product-img"/>
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

                : null
            
                }
                

            </div>

            <div className="products-table">
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th  onClick={() => this.handleSort()}>
                                    Name
                                </th>
                                <th onClick={() => this.handleSort()}>
                                    Product Type
                                </th>
                                <th>
                                    Sizes
                                </th>
                                <th>
                                    Vendor
                                </th>
                                <th>
                                    Tags
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                                    {
                                        products.map(product => (
                                            
                                            <tr key={product.id} onClick={() => this.handleRowDetails(product.id)}>
                                            {
                                                isSorted ? (<td>{type.title}</td>) : (<div><td>{product.title}</td>
                                                <td>{product.product_type}</td>
                                                <td>{product.options[0].values.toString().split(' ')}</td>
                                                <td>{product.vendor}</td>
                                                <td>{product.tags.split(',').slice(4, 9)}</td></div>)
                                            }
                                               
                                            </tr>
                                            
                                        ))
                                    }  
                        </tbody>
                    </Table>
                </Container>
            </div>

        </div>

      );
  }  
}

export default Products;