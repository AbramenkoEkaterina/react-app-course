import clx from './Button.module.css';

const isPrimary = true;

export const Button = () => {
  return <button className={isPrimary ? clx.primary : clx.btn}> Button</button>;
};
