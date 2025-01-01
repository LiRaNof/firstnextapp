 import Data from "./data"
export default interface propsOfTodos {
  todos:Data[],
  setTodos:React.Dispatch<React.SetStateAction<Data[]>>
}