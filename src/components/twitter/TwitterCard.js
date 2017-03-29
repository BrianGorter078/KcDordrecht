import React , { Component } from 'react';

import  { Card, CardItem, Thumbnail,Text }  from 'native-base';

var date, months;

class TwitterCard extends Component {
    constructor(props){
        super(props)
        months = ["jan.", "feb.", "mrt.", "apr.","mei","jun.","jul.","aug.","sept.","okt.","nov.","dec."]
        date = new Date(Date.parse(this.props.tweet.created_at));
    }
    getDate(){
        return date.getHours()+":"+(date.getMinutes()<10?"0":"")+date.getMinutes() + " - " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    }

    render(){

        return (                        
            <Card style={{flex:0}}>
                <CardItem>
                    <Thumbnail square size={35} source={{uri: this.props.tweet.user.profile_image_url}}/>
                    <Text style={{marginTop:5, marginLeft:4}}>{this.props.tweet.user.name}</Text>
                    <Text note> @{this.props.tweet.user.screen_name}</Text>
                </CardItem>
                <CardItem>   
                    <Text style={{marginLeft:2}}>{this.props.tweet.text}</Text>
                    <Text note style={{fontSize:10}}> {this.getDate()}</Text>
                </CardItem>
            </Card>
        );
    }
}

export default TwitterCard;