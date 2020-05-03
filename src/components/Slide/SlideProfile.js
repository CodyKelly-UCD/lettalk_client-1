import React, { useState } from "react";
import {Col, Row, Carousel, Image, Form, FormGroup, FormControl} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./SlideProfile.css"
import runtimeEnv from "@mars/heroku-js-runtime-env";

async function getOnline(){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/online`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        mode: 'cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
    })
        .catch((e) => {
                console.log(e)
                return e
            }
        )
}

async function getRating(){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/rating?email=${localStorage.getItem('email')}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        mode: 'cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
    })
        .catch((e) => {
                console.log(e)
                return e
            }
        )
}
class SlideProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick= this.handleClick.bind(this)
        this.moveBack   = this.moveBack.bind(this)
        this.myInput = React.createRef()
        this.state = ({index:0,userProfile: [], rating: null})
    }
    componentDidMount() {
        //Send request to see online people
        //Call online and update users profile
        getOnline().then((response)=>{
            if (response.success) {
                this.setState({userProfile:response.userProfile})
            }
        })
        getRating().then((response) =>{
            if (response.success) {
                this.setState({rating: response.rating})
            }
        })

        let idOnline = setInterval(
            async () => {
                const response = await getOnline()
                if (response.success) {
                    this.setState({userProfile:response.userProfile})
                }
                else{

                }
            }
            , 10000)

        let idRating = setInterval(
            async () => {
                const response = await getRating()
                if (response.success) {
                    this.setState({rating: response.rating})
                }
                else{

                }
            }
            , 10000)

    }


    moveBack(){
        this.setState({index: this.state.index - 1})
    }
    handleClick(e){
        e.preventDefault()
        let outerElement = (window.innerWidth) /2

        console.log(outerElement)
        if(e.clientX < outerElement){
            if(this.state.index >= 1) {
                this.setState({index: this.state.index - 1})
            }
            else{
                alert("That the end of picture")
            }
        }
        else if(e.clientX > outerElement){
            if(this.state.index < this.state.userProfile.length -1) {
                this.setState({index: this.state.index + 1})
            }
            else{
                alert("That the end of picture")
            }
        }
    }
    render() {
        return (

            <Form className="slideProfile"   onClick={this.handleClick}>
                        {( this.state.userProfile.length >  this.state.index && this.state.userProfile.length !== 0) ?
                            <div
                                 ref={this.myInput}
                            >
                                    <img className='imgProfile' style={{width:'100%',height:'50%'}}src={this.state.userProfile[this.state.index].picture !== null ? this.state.userProfile[this.state.index].picture: "https://www.elegantthemes.com/blog/wp-content/uploads/2019/02/Sorry-This-File-Type-Is-Not-Permitted-for-Security-Reasons-Error-Featured-Image.jpg"}
                                         alt="Picture"/>
                                    <p>Name: {`${this.state.userProfile[this.state.index].alias}`}</p>
                                    <p>Hobby: {`${this.state.userProfile[this.state.index].hobby}`}</p>
                                    <p>Description: {`${this.state.userProfile[this.state.index].description}`}</p>
                                    <p>Rating: {this.state.rating} </p>


                            </div>
                            :
                            <div><button onClick={this.moveBack}>Sorry, you scroll all people</button></div>


                        }
            </Form>


        )
    }
}

export default SlideProfile

