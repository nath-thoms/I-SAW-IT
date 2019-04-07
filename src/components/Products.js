import React, { Component } from 'react';
import { Table } from 'react-materialize';
import { Container } from 'react-bootstrap';
import * as API from '../API';
import Axios from 'axios';

class Products extends Component {

    
    state = {
        products: [],
        currentProduct: []
    }
    

    async componentDidMount() {
        const response = await Axios.get('https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data')
        const products = response.data.products
        this.setState({products: products})
    }

    handleRowDetails = id => {
      const filteredProduct =  this.state.products.filter(product => product.id === id)
        this.setState({
            currentProduct: filteredProduct
        }, () => console.log(filteredProduct[0].title, 'filter'))
    }
  render() {

    const {products} = this.state;
    console.log(products);

      return (

        <div>
            This is the Products component.

            <div className="products-table">
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
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
                                                <td>{product.title}</td>
                                                <td>{product.product_type}</td>
                                                <td>{product.options[0].values.toString().split(' ')}</td>
                                                <td>{product.vendor}</td>
                                                <td>{product.tags.split(',').slice(4, 9)}</td>
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