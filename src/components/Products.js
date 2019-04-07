import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-materialize';

class Products extends Component {

    //  constructor(props) {
        
    //  }

    componentDidMount() {
        axios.get('https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data')
        .then(res => {
            this.setState({ data: res.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }



  render() {
      return (

        <div>
            This is the Products component.
            {/* {console.log(this.state.data.products[0].title, 'hello')} */}

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
                        
                        
                        

                        
                    </tbody>
                </Table>
            </div>

        </div>

      );
  }  
}

export default Products;