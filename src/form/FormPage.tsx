import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './Form.css';

interface IValidation {
  type: string;
  argument?: string | string[];
  message: string;
  required?: any;
}

interface IData {
  name: string;
  placeholder?: string;
  fieldId: string;
  fieldType: string;
  validationType: string;
  defaultValue?: boolean | string | undefined;
  value: string | boolean | undefined | string[];
  validationRules?: IValidation[];
}

interface IForm {
  data: IData[];
}

export const FormPage: React.FC<IForm> = ({ data }) => {
  const createYupSchema = (schema: any, config: IData) => {
    const { fieldId, validationType, validationRules = [] } = config;

    if (!yup[validationType]) {
      return schema;
    }

    let validator = yup[validationType]();

    validationRules.forEach((rule: IValidation) => {
      const params = [];

      if (rule.argument) {
        params.push(rule.argument);
      }

      if (rule.message) {
        params.push(rule.message);
      }

      if (validator[rule.type]) {
        validator = validator[rule.type](...params);
      }
    });

    schema[fieldId] = validator;

    return schema;
  };

  const buildValidationSchema = (fields: IData[]) => {
    const shape = fields.reduce((accumulator, field) => {
      return createYupSchema(accumulator, field);
    }, {});
    return yup.object().shape(shape);
  };
  const schemaValidation = buildValidationSchema(data);

  return (
    <Formik
      initialValues={{}}
      validationSchema={schemaValidation}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {data.map((element) => {
            return (
              <>
                {!Array.isArray(element.value) ? (
                  element.fieldType !== 'select' &&
                  element.fieldType !== 'textarea' ? (
                    <div>
                      <Field
                        key={element.fieldId}
                        name={element.fieldId}
                        type={element.fieldType}
                      />
                      { errors[element.fieldId] && (
                        <div>{errors[element.fieldId]}</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Field
                        component={element.fieldType}
                        key={element.fieldId}
                        name={element.fieldId}
                      />
                      {touched[element.fieldId] && errors[element.fieldId] && (
                        <div>{errors[element.fieldId]}</div>
                      )}
                    </div>
                  )
                ) : (
                  element.fieldType === 'select' && (
                    <div>
                      <Field as="select" name={element.fieldId}>
                        {Array.isArray(element.value) &&
                          element.value?.map((el) => (
                            <option value={el} label={el} key={el}/>
                          ))}
                      </Field>
                      { errors[element.fieldId] && (
                        <div>{errors[element.fieldId]}</div>
                      )}
                    </div>
                  )
                )}
              </>
            );
          })}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
