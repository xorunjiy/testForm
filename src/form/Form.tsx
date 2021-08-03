import React from 'react';
import './Form.css';
import { CustomInput } from './components/customInput/CustomInput';
import { CustomSelect } from './components/customSelect/CustomSelect';

interface IData {
  name: string;
  placeholder?: string;
  fieldId: string;
  fieldType: string;
  validationType?: string;
  defaultValue?: boolean | string | undefined;
  value: string | boolean | undefined | string[];
  required: boolean;
}
interface IForm {
  data: IData[];
}

export const Form: React.FC<IForm> = ({ data }) => {
  const [showData, setShowData] = React.useState<string | string[]>('');

  const onSubmit = (event: React.SyntheticEvent<HTMLElement, Event>) => {
    event.preventDefault();
    alert(JSON.stringify(showData));
  };

  const onChange = (event: any) => {
    const { type, value, checked, name } = event.target;

    switch (type) {
      case 'checkbox':
        setShowData((prevState: any) => ({
          ...prevState,
          [name]: checked,
        }));
        break;
      case 'text':
        setShowData((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case 'radio':
        setShowData((prevState: any) => ({
          ...prevState,
          [name]: checked,
        }));
        break;
      case 'textarea':
        setShowData((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case 'select-one':
        setShowData((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
        break;
    }
  };

  return (
    <form onSubmit={onSubmit} className={'container'}>
      {data.map((element) =>
        !Array.isArray(element.value) ? (
          element.fieldType !== 'select' && element.fieldType !== 'textarea' ? (
            <CustomInput
              key={element.fieldId}
              name={element.name}
              type={element.fieldType}
              value={showData[element.fieldId]}
              onChange={onChange}
              required={element.required}
            />
          ) : (
            element.fieldType === 'textarea' && (
              <textarea
                key={element.fieldId}
                name={element.name}
                value={showData[element.fieldType]}
                onChange={onChange}
                required={element.required}
              />
            )
          )
        ) : (
          <CustomSelect
            key={element.fieldId}
            name={element.name}
            value={element.value}
            onChange={onChange}
          />
        )
      )}
      <button>Submit</button>
    </form>
  );
};
