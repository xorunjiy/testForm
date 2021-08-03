 import React from 'react'

 type Tprops = {
    name:string,
    type:string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value: string,
    required: boolean
 }
 
 export const CustomInput: React.FC<Tprops> = ( { 
    name, 
    type,
    value, 
    onChange,
    required}) => {
     return (
         <input name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
         />
     )
 }
 