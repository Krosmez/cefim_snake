import { useGlobalContext } from "../../context/GlobalContext";

const Modals = () => {
  const { state } = useGlobalContext();
  return state.modal ? state.modal : null;
};

export default Modals;
