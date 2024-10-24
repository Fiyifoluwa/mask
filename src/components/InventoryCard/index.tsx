import React from 'react';
import Pressable from '../Pressable';
import Text from '../Text';
import {formatAmount} from '../../utils/functions';
import {InventoryItem} from '../../types';
import Row from '../Row';
import Icon from '../Icon';

interface IInventoryItem {
  item: InventoryItem;
  onItemPress: () => void;
}

const InventoryCard = ({item, onItemPress}: IInventoryItem) => {
  const currentStockView = () => {
    if (Number(item.totalStock) < 1) {
      return (
        <Row centerAlign>
          <Icon name="Warning" color="red" size="sm" />
          <Text variant="regular12" color="red">
            Out of Stock
          </Text>
        </Row>
      );
    } else if (Number(item.totalStock) < 5) {
      return (
        <Row centerAlign>
          <Icon name="Warning" color="orange" size="sm" />
          <Text variant="regular12" color="orange">
            Stock: {item.totalStock}
          </Text>
        </Row>
      );
    } else {
      return <Text variant="regular12">Stock: {item.totalStock}</Text>;
    }
  };

  const renderCurrentStock = currentStockView();

  return (
    <Pressable onPress={onItemPress} px="m">
      <Text variant="regular16">{item.name}</Text>
      {renderCurrentStock}
      <Text variant="regular12">Price: {formatAmount(item.price)}</Text>
    </Pressable>
  );
};

export default InventoryCard;
