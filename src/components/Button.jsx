import React from 'react';
import classNames from 'classnames';
const Button = ({onClick,outline,children,test}) =>{
  return(
    <button
       onClick = {onClick}
       className={classNames(
      'button',
      {
        'button--outline':outline
      },
      {
        'button--test':test
      }
    )}>{children}</button>
  )
}
export default Button;
