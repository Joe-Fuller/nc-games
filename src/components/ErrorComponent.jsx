const ErrorComponent = (props) => {
  const { error, className } = props;
  return (
    <div className={className ? className : "frontpage"}>{error.message}</div>
  );
};

export default ErrorComponent;
