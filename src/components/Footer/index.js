import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap'
import ballon_logo from '../../assets/images/ballon-logo.jpg'
import style from './style.scss'

class Footer extends Component {
    render() {
        return (
            <Container className={style.container}>
                <Row>
                    <Col className='center'>
                        <Image className='image-logo'
                               src={ballon_logo}
                               rounded
                        />
                    </Col>
                    <Col>Col Social Media</Col>
                    <Col>Col Email Address</Col>
                </Row>
            </Container>
        )
    }
}

export default Footer
