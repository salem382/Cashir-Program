import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../store/productsSlice'
import './addnew.scss';

const AddNewItems = () => {


    const dispatch = useDispatch ();
    const [product , setProduct] = useState ({
        name:'',
        barCode:'',
        price:'',
        numbers:''
    }); 
    const nameInput = useRef ();
    const barCode = useRef ();
    const priceInput = useRef ();
    const numberInput = useRef ();
    useEffect(() => {
        nameInput.current.focus();
    },[]);
    const handleAddItem = (e, type) => {
       let obj = {...product};
       obj[type] = e.target.value;
       setProduct({...obj});
    }
    const sendDate = () => {
        if (product.name !== '' && product.price !== '' &&
        product.barCode !== '' && product.numbers !== '') {
            dispatch(addProduct(product));
            nameInput.current.value = '';
            barCode.current.value = '';
            priceInput.current.value = '';
            numberInput.current.value = '';
            let x = {
                name:'',
                barCode:'',
                price:'',
                numbers:''
            }
            setProduct({...x});
            nameInput.current.focus();
        } 
    }

    const handleNameInput = (e) => {
       if (e.code === 'Enter') {
            if (nameInput.current.value !== '') {
                //el4art 3l4an atkad azaa kan fe al awaal wla al a5aar
                //3l4an hn2all al focus direct ll barcode
                barCode.current.focus();
            }
       }
    }
    const handlebarcodeInput = (e) => {
        if (e.code === 'Enter') {
            numberInput.current.focus();
        }
         
     }
     const handleNumberInput = (e) => {
        if (e.code === 'Enter') {
            priceInput.current.focus();
        }
         
     }
     const handlePriceInput = (e) => {
        if (e.code === 'Enter') {
            sendDate ();
        } 
     }

    return (
        <div className="add-new">
           <Container>
                <ul className='list-unstyled d-flex table-header mt-5'>
                    <li>Name</li>
                    <li>Barcode</li>
                    <li>Number</li>
                    <li>Price</li>
                </ul>   
                <form onSubmit={e => e.preventDefault()}>
                    <div className='d-flex table-body'>
                        <div>
                            <input onChange={(e) => handleAddItem(e, 'name')} onKeyUp={(e) => handleNameInput(e)} ref={nameInput} type='text' className='first-input'/>
                        </div>
                        <div>
                            <input onChange={(e) => handleAddItem(e, 'barCode')}  onKeyUp={(e) => handlebarcodeInput (e)} ref={barCode} type='number' className='first-input'/>
                        </div>
                        <div>
                            <input onChange={(e) => handleAddItem(e, 'numbers')}  onKeyUp={(e) => handleNumberInput(e)} ref={numberInput} type='number' className='first-input'/>
                        </div>
                        <div>
                            <input onChange={(e) => handleAddItem(e, 'price')}  onKeyUp={(e) => handlePriceInput(e) } ref={priceInput} type='number' className='first-input'/>
                        </div>
                    </div>
                    <button  onClick={sendDate} className='btn btn-color text-white ms-auto mt-4 me-3 d-block'>Add Item</button> 
                </form>        
           </Container>
        </div>
    )
}

export default AddNewItems;