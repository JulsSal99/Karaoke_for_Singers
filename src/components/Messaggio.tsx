import React from "react";

interface MessaggioProps {
  testo: string;
}

const Messaggio: React.FC<MessaggioProps> = (props) => {
  const { testo } = props;

  return <div className="alert alert-info">{testo}</div>;
};

export default Messaggio;
