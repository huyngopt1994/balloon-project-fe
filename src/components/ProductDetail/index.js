import React, { Component } from 'react';
import { Card } from 'react-bootstrap'

class Product extends Component {
    render() {
        return (<Card>
                <Card.Img variant="top"
                          src="https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/691631_full&$hide_Count-0020_Count=0"/>
                <Card.Body>
                    <Card.Title>Bong bóng ngôi sao</Card.Title>
                    <Card.Text>
                        Bong bóng ngôi sao có nhiều màu sắc cho các bạn lựa chọn
                    </Card.Text>
                </Card.Body>
            </Card>
        )

    }
}

export default Product
