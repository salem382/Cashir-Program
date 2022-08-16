import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {resetShift} from '../../store/pillSlice'

const EndShift = () => {

    const input = useRef()
    const dispatch =  useDispatch ();
    const {pill} = useSelector(state => state.pill);
    const [amount, setAmount] = useState();
    const [finalResult, setFinalResult] = useState(0);

    const handleClick = (e) => {
        e.preventDefault();
        setFinalResult(amount - pill.shift);
        dispatch(resetShift())
        input.current.value = '';
    }
    return (
        <form className="p-5" onSubmit={(e) => handleClick(e)}>
            <label className="fs-4 mb-2">Enter Amount</label> <br/>
            <input ref={input} onChange={(e) => setAmount(e.target.value)} type='number'/> <br/>
            <button className="btn btn-color text-white mt-3">End Shift</button>
            <div>{finalResult}</div>
        </form>
    )
}

export default EndShift;