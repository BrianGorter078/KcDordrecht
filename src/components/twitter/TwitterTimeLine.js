import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import  { Card, CardItem}  from 'native-base';
import TwitterCard from './TwitterCard';

import axios from 'axios';


class TwitterTimeLine extends Component{

    constructor(props){
        super(props)
        this.state = {timeline: []}
    }
    componentWillMount(){
        var instance = axios.create({
            baseURL: 'https://api.twitter.com/1.1/search',
            timeout: 1000,
            headers: {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAOEIeQAAAAAAZcERfDTF4gNt3f%2FEJ6krl7PbTzg%3DM1nnsaeBHZpBXsHeeVob7VB6d3ofqWPRe1IWhqvN6ZJBqy5i30'}
        });

        instance.get("/tweets.json?q=kcdordt&count=30").then(response => {
            this.setState({timeline: response.data.statuses})
        }).catch(err => {
            if(err != null){
                console.log("error " + err )
            }
        })
    }
    componentWillUnmount(){
        this.setState({timeline: []})
    }

    renderTwitterList(){
        return this.state.timeline.map(tweet => <TwitterCard key={tweet.id} tweet={tweet}/>)
    }


    render(){
        if(this.state.timeline.length != 0){
            return(
                <View style={{justifyContent: 'center'}}>
                    {this.renderTwitterList()}
                </View>
            );
        }
        return(
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                    <Text style={{textAlign:'center', marginTop:10}}>Geen tweets beschikbaar, oudere tweets kunnen niet worden opgehaald</Text>
            </View>
        )
    }
}

export default TwitterTimeLine;