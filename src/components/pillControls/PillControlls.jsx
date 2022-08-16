import {Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import './pillcontrols.scss';
import {useState} from 'react';
import {discount, getTotal, deleteAll, addToShift, deleteTotal} from '../../store/pillSlice'
import {handleNumbers} from '../../store/productsSlice'
import { useEffect } from 'react';

const PillControls = () => {

    const dispatch = useDispatch (); 
    const {pill} = useSelector(state => state.pill);
    const {deleted} = useSelector(state => state.products);
    const [openPrcentage, setOpenPrcentage] = useState(false);
    const [changePay, setChangePay] = useState(false)// dy 3l4an mbyl72a4y y4waf deleted at8yarat wlaa l2aa
   useEffect(() => {
    if (deleted) {
        dispatch(deleteAll());
        dispatch(addToShift());
    }
   },[changePay])

    const handleChangeDiscount = (e) => {
        if (e.target.value === '') {
            dispatch(getTotal());
        } else if (openPrcentage === true ) {
            dispatch(getTotal());
            dispatch(discount(['percent',e.target.value]))
        }else if (openPrcentage === false ) {
            dispatch(getTotal());
            dispatch(discount(['num',e.target.value]))
        }
    }
    const handlePay = () => {
        dispatch(handleNumbers(pill.pillItems))
        setChangePay((prev) => !prev);
    }
    const handleDeleteAll = () => {
        dispatch(deleteAll())
        dispatch(deleteTotal())
    }

    return (
        <div style={{width:'27%', height:'530px'}} className='py-2 bg-white me-auto'>
            <Container>
                <p className='text-primary fs-1 text-center pt-3'>Total :<span> </span>  {pill.total}</p>
                <form className='disount-container'>
                    <label className='fs-4'>Discount</label> 
                    <div className='d-flex justify-content-between align-items-center py-3'>
                        <input type='number' onChange={(e) => handleChangeDiscount(e)}/>
                        <p className='percentage-text fs-4 fw-bold p-0 m-0' style={{display:openPrcentage? 'block':'none'}}>%</p>
                        <div onClick={() => setOpenPrcentage((prev) => !prev)} className={openPrcentage ? 'percentage position-relative active' : 'percentage position-relative'}>
                            <div className='position-absolute'></div>
                        </div>
                    </div>
                </form>
                <div className='d-flex justify-content-between mt-3'>
                    <div onClick={() => handlePay ()} style={{cursor:'pointer'}} className=' py-2 px-5 rounded btn-color text-white'>Pay</div>
                    <div onClick={handleDeleteAll} style={{cursor:'pointer'}} className=' py-2 px-3 rounded btn-color text-white'>Delete All</div>
                </div>
            </Container>            
        </div>
    )
}

export default PillControls;