import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/store/counterSlice.jsx";

export const CounterValue = () => {
	const countVal = useSelector((state) => state.counter.value)
	const dispatch = useDispatch()
	return (
		<>
			<div className={"cursor-pointer h-20 bg-gray-300 text-center flex justify-center w-full items-center space-x-4"}>
				<div onClick={()=>dispatch(decrement())} className={"text-2xl bg-cyan-400 hover:bg-cyan-800 w-9 rounded-full h-9"}> - </div>
				<div> {countVal} </div>
				<div onClick={()=>dispatch(increment())} className={"cursor-pointer text-2xl bg-cyan-400 hover:bg-cyan-800 w-9 rounded-full h-9"}> +</div>
			</div>
		</>
	)
}