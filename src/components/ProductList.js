import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { 
  ListItem, 
  Avatar, 
  Divider,
  Icon, 
  Button
} from 'react-native-elements';

export default props => {
  function confirmProductDeletion(product) {
    Alert.alert('Excluir Produto 🗑️', 'Deseja excluir o produto?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteProduct',
            payload: product
          })
        }
      },
      {
        text: 'Não'
      }
    ]);
  };

  function getActions(product) {
    return(
      <Fragment>
        <Button
          onPress={() => props.navigation.navigate('ProductForm', product)}
          type="clear"
          icon={<Icon name="edit" size={25} color='#517fa4' />}
        />
        <Button
          onPress={() => confirmProductDeletion(product)}
          type="clear"
          icon={<Icon name="delete" size={25} color='tomato' />}
        />
      </Fragment>
    )
  };

  function getProducts({ item: product }) {
    return (
      <Fragment>
        <ListItem 
          round
          key={product.key}
          onPress={() => props.navigation.navigate('ProductForm', product)}
        >
          <Image
            source={product.img}
            style={{
              width: 40,
              height: 40,
              alignSelf: 'center',
              marginLeft: 10,
              borderRadius: 5,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{product.name}</ListItem.Title>
            <ListItem.Subtitle>{product.amount} unit</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Subtitle>R$ {product.unit_value}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>Total:</ListItem.Title>
            <ListItem.Subtitle>R$ {Number(product.unit_value * product.amount)}</ListItem.Subtitle>
          </ListItem.Content>
          {getActions(product)}
        </ListItem>
        <Divider style={{ backgroundColor: 'blue' }} />
      </Fragment>
    )
  };
}