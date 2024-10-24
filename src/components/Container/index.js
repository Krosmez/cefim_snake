import "./style.css";

export const Container = ({ children, className }) => {
  return (
    <div className={`${className ? className : ""} container`}>{children}</div>
  );
};

export default Container;
