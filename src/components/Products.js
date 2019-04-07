import React, { Component } from 'react';
import { Table } from 'react-materialize';
import * as API from '../API';
import Axios from 'axios';

class Products extends Component {

    
    state = {
        products: []
    }
    

    // async componentDidMount() {
    //     const response = await Axios.get('https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data')
    //     const products = response.data
    //     this.setState({products: products}, () => console.log(response.data, 'res'))
    // }


    componentDidMount () {
         Axios.get(`${"https://cors-anywhere.herokuapp.com/"}https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data`).then(response => {
               this.setState({
                   products: response.data
               })
               
            })
       
    }
    



  render() {

    const {products} = this.state;

    
    
      return (

        <div>
            This is the Products component.

            <div className="products-table">

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
                    
                            <tr>

                                {
                                   
                                    Object.keys(products).map(product => {
                                       return  (
                                        <div>
                                       <td key={product.id}>{product.title}</td>
                                       <td key={product.id}>{product.id}</td>
                                       <td key={product.id}>{product.vendor}</td>
                                       <td key={product.id}>{product.handle}</td>
                                       </div>
                                    )
                                    })
                                }
                              
                                {/* <td>hello</td>
                            
                            
                                <td>hello</td>
                            
                            
                                <td>hello</td>
                            
                            
                                <td>hello</td> */}
                            </tr>

                        
                    </tbody>
                </Table>
            </div>

        </div>

      );
  }  
}

export default Products;