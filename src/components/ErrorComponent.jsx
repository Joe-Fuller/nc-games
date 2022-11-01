const ErrorComponent = ({ error }) => {
  return <div className="frontpage">{error.message}</div>;
};

export default ErrorComponent;
