import React, { useContext } from "react";
import Styles from "./input-styles.scss";
import formContext from "@/presentation/components/contexts/form/form-context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const {state, setState} = useContext(formContext);
  const error = state[`${props.name}Error`];
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };
  //Dessa forma ele tira o autoComplete do GoogleChrome, mesmo estando com o readOnly


  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const getStatus = (): string => {
    return  error ? "🔴" : "🟢"
  };

  const getTitle = (): string => {
    return error || "ok"
  };
  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
