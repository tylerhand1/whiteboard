import { IState } from "@/types";
import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const error = useSelector((state: IState) => state.connection.error);

  return (
    <>
      {error && <h2>Error joining lobby...</h2>}
    </>
  )
}

export default ErrorMessage;