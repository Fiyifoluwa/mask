import React, {FC} from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {inventoryItemSchema} from '../../utils/validation';
import {InventoryItem, regexPatterns} from '../../types';
import {CurrencyInput, TextInput} from '../Input';
import Text from '../Text';
import {heightPixel} from '../../utils/responsiveDimensions';

interface InventoryFormProps {
  initialValues: Partial<InventoryItem>;
  onSubmit: (values: Partial<InventoryItem>) => Promise<void>;
  submitButtonText: string;
  existingItems: InventoryItem[];
}

export const InventoryForm: FC<InventoryFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonText,
  existingItems,
}) => {
  const validationSchema = inventoryItemSchema(existingItems);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}>
      {({handleSubmit, isValid}) => (
        <ScrollView style={styles.container}>
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
          />

          <CurrencyInput
            leftComponent={<Text mr="s">₦</Text>}
            label="Price"
            name="price"
            placeholder="Enter price"
            hideLabel
          />

          <TextInput
            name="description"
            label="Description"
            placeholder="Enter description (minimum 3 words)"
            style={{height: heightPixel(100)}}
            multiline
            hideLabel
          />

          <Button
            title={submitButtonText}
            onPress={() => handleSubmit()}
            disabled={!isValid}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButtonContainer: {
    marginTop: 16,
  },
});
