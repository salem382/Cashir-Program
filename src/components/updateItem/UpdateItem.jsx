import './update.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import {updateProduct} from '../../store/productsSlice';


const UpdateItem = () => {

    const dispatch = useDispatch();
    const searchInput = useRef();
    const {products} = useSelector(state => state.products);
    const [serachItems, setSearchItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [chosenItem , setChosenItem] = useState({
        name:'',
        barCode:'',
        price:'',
        numbers:''
    });
    const [openSearchMenu, setopenSearchMenu] = useState(false);

    useEffect(() => {
      searchInput.current.focus();
    },[])
    useEffect(() => {
          if (serachItems.length === 0) {
              setopenSearchMenu(false)
          } else {
              setopenSearchMenu(true)
          }
    },[serachItems])

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
            setChosenItem({...serachItems[currentIndex]});
            setopenSearchMenu(false);
            searchInput.current.value = '';
        }
    }

    const handlechosenItem = (item) => {
        setChosenItem({...item});
        setopenSearchMenu(false);
        searchInput.current.value = '';
    } 
    const search = (e) => {
        setSearchItems([]);
        products.forEach((ele, ind) => {
            if (ele.name.includes(e.target.value) || ele.barCode.includes(e.target.value)) {
                if (e.target.value !== '') {
                    setSearchItems((prev) =>{
                        return [...prev,{...ele,ind : ind}];
                    })
                }
            }
        })
    }
    const sendUpdatedElement = () => {
        
        dispatch(updateProduct([chosenItem.ind, chosenItem]));
        let x = {
            name:'',
            barCode:'',
            price:'',
            numbers:''
        }
        setChosenItem({...x});
    }
    const handleChange = (e) => {
        let x = {...chosenItem}
       x[e.target.name] = e.target.value;

       setChosenItem({...x});
    }

    return (
        <div className="upeate-item mt-5">
            <Container>
                <div className='position-relative menu-container'>
                    <div>
                        <input placeholder='Search by Name or barcode' onKeyUp={(e) =>handleArrows(e)} onChange={(e) => search(e)} ref={searchInput} type='text' className="search-input" />
                    </div>
                    <ul style={{display:openSearchMenu ? 'block' : 'none'}} className='menu list-unstyled position-absolute'>
                       {serachItems.map((item, index) => <li key={index} className={index === currentIndex ? 'active' : ''} onClick={() => handlechosenItem(item)}>
                        {item.name}
                      </li>)} 
                    </ul>
                </div>
                {chosenItem.name !== '' && 
                    <div className='product-content mt-5'>
                        <ul className='d-flex list-unstyled'>
                            <li>Name</li>
                            <li>Barcode</li>
                            <li>Price</li>
                            <li>Numbers</li>
                        </ul>
                        <form className='d-flex'>
                            <input  name= 'name' onChange={(e) => handleChange(e)} value={chosenItem.name} type='text'/>
                            <input  name= 'barCode' onChange={(e) => handleChange(e)}  value={chosenItem.barCode} type='number'/>
                            <input  name= 'price' onChange={(e) => handleChange(e)} value={chosenItem.price} type='number'/>
                            <input  name= 'numbers' onChange={(e) => handleChange(e)} value={chosenItem.numbers} type='number'/>
                        </form>
                        <div className='btn btn-color' onClick={sendUpdatedElement}>Update</div>
                    </div>
                }
                
            </Container>
        </div>
    )
}

export default UpdateItem;
