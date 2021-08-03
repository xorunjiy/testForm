import React from 'react';

type Tprops = {
  name: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  value: string[];
};

export const CustomSelect: React.FC<Tprops> = ({
  name,
  value,
  onChange,
}) => {
    
  return (
    <select name={name} onChange={onChange}>
      {value?.map((element) => { return <option key={element}> {element} </option>})}
    </select>
  );
};
