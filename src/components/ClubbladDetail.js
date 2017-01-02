import React from 'react';
import { Text, Button } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const ClubbladDetail = (props) => {
    return(
        <Card>
            <CardSection>
                <Text style={styles.textStyle}>Clubblad {props.clubblad.Number}</Text>
            </CardSection>
        </Card>
    )
}

const styles = {
    textStyle:{
        color:'white'

    }
}

export default ClubbladDetail;