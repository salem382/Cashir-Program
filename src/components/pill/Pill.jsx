import './pill.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addItem, updateCount, getTotal, deleteItem} from '../../store/pillSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Pill = () => {


    const {pill} = useSelector(state => state.pill);
    const dispatch =  useDispatch()
    const searchInput = useRef ();
    const {products} = useSelector(state => state.products);
    const [serachItems, setSearchItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    useEffect(() => {
        searchInput.current.focus();
      },[])
      const search = (e) => {
        setSearchItems([]);
        products.forEach((ele) => {
            if (ele.name.includes(e.target.value) || ele.barCode.includes(e.target.value)) {
                if (e.target.value !== '') {
                    setSearchItems((prev) =>{
                        return [...prev,{...ele}];
                    })
                }
            }
        })
    }
    const handleArrows = (e) => {

        if (serachItems.length === 0) {
            setCurrentIndex(-1)
            //3l4an yrga3 tanya la -1 fea 7alat ana delete all items from search
        }
        if (e.code === 'ArrowDown' && serachItems.length > 0 
        && currentIndex !== serachItems.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else if (e.code === 'ArrowUp' && serachItems.length > 0 && currentIndex !== 0) {
            setCurrentIndex((prev) => prev - 1);
        }
        else if (e.code === 'Enter') {
            dispatch(addItem(serachItems[currentIndex]));
            dispatch(getTotal());
            setSearchItems([]);
            searchInput.current.value = '';
        }
    }
    const handleChangeNum = (e, name) => {
        console.log (e.target.value);
        if (e.target.value >= 1) {
            dispatch(updateCount([name, e.target.value]))
            dispatch(getTotal());
        }
    }
    const handleAddItem = (item) => {
        dispatch(addItem(item))
        dispatch(getTotal());
        setSearchItems([]);
        searchInput.current.value = '';
    }
    const handleDeleteItem = (ind) => {
        dispatch(deleteItem(ind));
        dispatch(getTotal());
    }
    return (
        <div className='pill' style={{width:'70%'}}>
            <div className="search-container position-relative">
                <input placeholder='Search by name or barcode' onKeyUp={(e) =>handleArrows(e)} onChange={(e) => search(e)} ref={searchInput} type='text'/>
                <ul className="search-menu position-absolute list-unstyled p-0">
                    {serachItems.map((item, index) => <li onClick={() => handleAddItem(item)}  key={index} className={index === currentIndex ? 'active' : ''}>
                        {item.name}
                    </li>)} 
                </ul>
            </div>
            <div className='items-menu mt-5'>
                {pill.pillItems.length > 0 && <ul className='names list-unstyled p-0 d-flex'>
                    <li>name</li>
                    <li>Count</li>
                    <li>price</li>
                    <li>Numbers</li>
                    <li></li>
                </ul>}
                <ul className='bg-white items list-unstyled p-0'>
                    {pill.pillItems.map((item, ind) => <li className='py-2 d-flex align-items-center border-bottom' key={ind}>
                        <p>{item.name}</p>
                        <p>
                            <input onChange={(e) =>handleChangeNum(e, item.name)} value={item.count} type='number' style={{width:'40px'}}/>
                        </p>
                        <p>{item.price}</p>
                        <p>{item.numbers}</p>
                        <p>
                            <FontAwesomeIcon onClick={() => handleDeleteItem (ind)} icon={faTrash} style={{cursor:'pointer'}} />
                        </p>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Pill;
