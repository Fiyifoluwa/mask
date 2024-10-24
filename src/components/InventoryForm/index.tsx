import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {Formik, FormikProps} from 'formik';
import {inventoryItemSchema} from '../../utils/validation';
import {InventoryItem, regexPatterns} from '../../types';
import {CurrencyInput, TextInput} from '../Input';
import Text from '../Text';
import Pressable from '../Pressable';
import Box from '../Box';
import {FormStyles} from './styles';
import Row from '../Row';
import Icon from '../Icon';
import {heightPixel} from '../../utils/responsiveDimensions';
import {useTheme} from '../../theme';
import {isEmpty} from 'lodash';

interface InventoryFormProps {
  initialValues: Partial<InventoryItem>;
  onSubmit: (values: Partial<InventoryItem>) => Promise<void>;
  onContinueAndAdd?: (values: Partial<InventoryItem>) => Promise<void>;
  submitButtonText: string;
  existingItems: InventoryItem[];
  currentItemId?: string;
  handleDelete?: () => void;
}

export const InventoryForm: FC<InventoryFormProps> = ({
  initialValues,
  onSubmit,
  onContinueAndAdd,
  submitButtonText,
  existingItems,
  currentItemId,
  handleDelete,
}) => {
  const validationSchema = inventoryItemSchema(existingItems);
  const {colors} = useTheme();

  const adjustStockCount = (
    value: number,
    setFieldValue: FormikProps<Partial<InventoryItem>>['setFieldValue'],
    increase: boolean = true,
  ) => {
    if (increase) {
      setFieldValue('totalStock', String(value + 1));
    } else {
      if (value === 0) {
        return;
      }
      setFieldValue('totalStock', String(value - 1));
    }
  };

  const handleFormSubmit = async (values: Partial<InventoryItem>) => {
    await onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      validateOnMount={true}>
      {({
        handleSubmit,
        isValid,
        setFieldValue,
        values,
        resetForm,
        validateForm,
        setFieldTouched,
      }) => (
        <ScrollView
          contentContainerStyle={FormStyles.scrollViewContainer}
          bounces={false}>
          <Box style={FormStyles.content}>
            <TextInput
              name="name"
              label="Item Name"
              placeholder="Enter item name"
              autoCapitalize="words"
              autoCorrect={false}
              hideLabel
            />

            <TextInput
              name="totalStock"
              label="Total stock"
              placeholder="Enter total stock"
              keyboardType="numeric"
              expectedRegex={regexPatterns.NUMBER}
              hideLabel
              rightComponent={
                <Row
                  centerAlign
                  gap="sml"
                  style={{marginLeft: -heightPixel(24)}}>
                  <Pressable
                    onPress={() =>
                      adjustStockCount(
                        Number(values.totalStock),
                        setFieldValue,
                        false,
                      )
                    }>
                    <Icon name="MinusOne" size="m" color={colors.primary} />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      adjustStockCount(
                        Number(values.totalStock),
                        setFieldValue,
                        true,
                      )
                    }>
                    <Icon name="PlusOne" size="m" color={colors.primary} />
                  </Pressable>
                </Row>
              }
            />

            <CurrencyInput
              leftComponent={
                <Text mr="s" variant="regular14">
                  ₦
                </Text>
              }
              label="Price"
              name="price"
              placeholder="Enter price"
              hideLabel
            />

            <TextInput
              name="description"
              label="Description"
              placeholder="Enter description"
              multiline
              hideLabel
            />

            {!currentItemId && onContinueAndAdd && (
              <Pressable
                mt="m"
                onPress={async () => {
                  const errors = await validateForm();

                  if (isEmpty(errors)) {
                    await onContinueAndAdd(values);
                    resetForm();
                  } else {
                    Object.keys(errors).forEach(key => {
                      setFieldTouched(key);
                    });
                  }
                }}>
                <Row centerAlign>
                  <Icon name="Plus" size="smh" color={colors.primary} />
                  <Text variant="regular14" color="primary">
                    Continue & add another item
                  </Text>
                </Row>
              </Pressable>
            )}
          </Box>

          <Box py="m">
            <Pressable
              borderWidth={0.5}
              borderColor="transparent"
              alignSelf="center"
              px="ll"
              py="sml"
              bg="primary"
              mt="ll"
              borderRadius="xl"
              width={'100%'}
              disabled={!isValid}
              opacity={isValid ? 1 : 0.5}
              onPress={() => handleSubmit()}>
              <Text color="white" textAlign="center" variant="buttonLabel">
                {submitButtonText}
              </Text>
            </Pressable>

            {currentItemId && (
              <Pressable
                borderWidth={0.5}
                borderColor="red"
                bg="transparent"
                alignSelf="center"
                px="ll"
                py="sml"
                mt="m"
                borderRadius="xl"
                width={'100%'}
                disabled={!isValid}
                opacity={isValid ? 1 : 0.5}
                onPress={handleDelete}>
                <Text color="red" textAlign="center" variant="buttonLabel">
                  Delete Item
                </Text>
              </Pressable>
            )}
          </Box>
        </ScrollView>
      )}
    </Formik>
  );
};
