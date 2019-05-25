import React, { Component } from 'react';
import { Card } from 'react-bootstrap'

class Product extends Component {
    render() {
        return (<Card>
                <Card.Img variant="top"
                          src={this.props.image}/>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Product
