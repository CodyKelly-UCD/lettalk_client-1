import React, { useState } from "react";
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./Page.css"
import onlineIcon from '../../Icons/onlineIcon.png';
import SlideProfile from "../Slide/SlideProfile";
import {createBrowserHistory} from "history";
import {Button} from "react-bootstrap";
import {checkOnline} from "../../action/online";

const history = createBrowserHistory();



class Welcome extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
            //Dispatch to main page
            //Dispatch to login or register
        history.push('/login')
        window.location.href = '/login'
    }
    render() {
        return (
            <div>
                <h2><img className="onlineIcon" src={onlineIcon} alt="online icon" />{this.props.onlineUser} amazing people are currently online</h2>
                <Button variant="success"  onClick={this.onClick}>Let chat</Button>
            </div>
        )
    }
}

class Landing_Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { onlineUser: 0}
    }


    componentDidMount() {

        checkOnline().then((res) => {
            if(res.success && this.state.onlineUser !== res.numberOnline){
                this.setState({onlineUser:res.numberOnline})
            }
        })

    }


    render() {
        return (
            <div>
            <Row className="text-center">
                <Col>
                    {(this.props.username) === " "  ?
                        <Welcome onlineUser={this.state.onlineUser}/> :
                        <div>
                            <h1>Hi {this.props.username} </h1>
                            <SlideProfile/>
                        </div>
                    }
                </Col>
            </Row>

            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}
export default connect(mapStateToProps)(Landing_Page)

