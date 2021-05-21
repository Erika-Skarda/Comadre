import React, { Fragment, useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { 
  ListItem, 
  Icon, 
  Avatar, 
  Button,
  Divider} from 'react-native-elements';
import ProductsContext from '../context/ProductsContext';

export default props => {

  const { state, dispatch } = useContext(ProductsContext);


  function confirmProductDeletion(product) {
    Alert.alert('Excluir Produto', 'Deseja excluir o produto?', [
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
          key={product.id}
          onPress={() => props.navigation.navigate('ProductForm', product)}
        >
          <Avatar source={{uri: product.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{product.name}</ListItem.Title>
            <ListItem.Subtitle>{product.quantity} unit</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            {/* <ListItem.Title></ListItem.Title> */}
            <ListItem.Subtitle>R$ {product.unit_value}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>Total:</ListItem.Title>
            <ListItem.Subtitle>R$ {Number(product.unit_value * product.quantity)}</ListItem.Subtitle>
          </ListItem.Content>
          {getActions(product)}
        </ListItem>
        <Divider style={{ backgroundColor: 'blue' }} />
      </Fragment>
    
    )
  };

  return (
    <View>
      <FlatList
        keyExtractor={product => product.id}
        data={state.products}
        renderItem={getProducts}
      /> 
    </View>
  )
}