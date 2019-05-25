import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { getProductList } from '../../api'
import Footer from '../../components/Footer'
import Navigator from '../../components/Navigator'
import Product from '../../components/ProductDetail'
import { error } from '../../components/toastr'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'products': []
        }
        getProductList()
            .then(result => {
                this.setState({ 'products': result.data.results })
            })
            .catch(err => {
                error('Hệ thống bị lỗi xin vui lòng thử lại!')
            })
    }

    render() {
        console.log((this.state.products))
        return (
            <div>
                <Navigator/>
                <Container>
                    <Row>
                        {
                            this.state.products.map(product => {
                                return (
                                    <Col key={product.id}>
                                        <Product
                                            image={product.image}
                                            name={product.name}
                                            description={product.description}
                                        />
                                    </Col>)
                            })
                        }
                    </Row>
                </Container>
                <Footer/>
            </div>

        )
    }
}

export default Home
