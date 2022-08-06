import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Storage(props) {



    const [storageValues, setStorageValues] = useState({
        storage1:0,
        storage2:0,
        storage3:0,
        storage4:0,
        storage5:0,
        storage11:0,
        storage22:0,
        storage33:0,
        storage44:0,
        storage55:0,
        storage6:'0',
    })

    const getData =()=>{
        axios.post("http://localhost:3001/sales/getStorageData").then((response) => {
            // console.log(response.data)
            setStorageValues({...storageValues,
                storage1:response.data[0][0]['amount'],
                storage2:response.data[0][1]['amount'],
                storage3:response.data[0][2]['amount'],
                storage4:response.data[0][3]['amount'],
                storage5:response.data[0][4]['amount'],
                storage11:response.data[0][0]['amountleft'],
                storage22:response.data[0][1]['amountleft'],
                storage33:response.data[0][2]['amountleft'],
                storage44:response.data[0][3]['amountleft'],
                storage55:response.data[0][4]['amountleft'],
                storage6:response.data[1][0]['note6'],
            })
        });
        
    }

    function saveComment() {
        var data = storageValues
        // console.log(data)
        if(window.confirm('هل انت واثق من تعديل البيانات ؟')){
            axios.post("http://localhost:3001/sales/editStorage", data).then((response) => {
                alert('تمت العملية بنجاح')
                props.closemodal()
            });
        }
    }

    return (
        <Modal show={props.show} onHide={props.closemodal} size='lg' autoFocus='true' onShow={() => { getData() }} centered>
            <Modal.Header closeButton>
                <Modal.Title>المخزن</Modal.Title>
            </Modal.Header>
            <Modal.Body dir='rtl'>
                <table className='table '>
                    <tbody>
                        <tr>
                            <td>عدد الجرابات</td>
                            <td><input type='number' className='form-control' value={storageValues.storage1} onChange={(e)=>setStorageValues({...storageValues,storage1:e.target.value})}></input></td>
                            <td><input type='number' className='form-control' disabled value={storageValues.storage11} onChange={(e)=>setStorageValues({...storageValues,storage11:e.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td>عدد الاسكرينات</td>
                            <td><input type='number' className='form-control' value={storageValues.storage2} onChange={(e)=>setStorageValues({...storageValues,storage2:e.target.value})}></input></td>
                            <td><input type='number' className='form-control' disabled value={storageValues.storage22} onChange={(e)=>setStorageValues({...storageValues,storage22:e.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td>عدد السماعات</td>
                            <td><input type='number' className='form-control' value={storageValues.storage3} onChange={(e)=>setStorageValues({...storageValues,storage3:e.target.value})}></input></td>
                            <td><input type='number' className='form-control' disabled value={storageValues.storage33} onChange={(e)=>setStorageValues({...storageValues,storage33:e.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td>عدد الكابلات</td>
                            <td><input type='number' className='form-control' value={storageValues.storage4} onChange={(e)=>setStorageValues({...storageValues,storage4:e.target.value})}></input></td>
                            <td><input type='number' className='form-control' disabled value={storageValues.storage44} onChange={(e)=>setStorageValues({...storageValues,storage44:e.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td>عدد الشواحن</td>
                            <td><input type='number' className='form-control' value={storageValues.storage5} onChange={(e)=>setStorageValues({...storageValues,storage5:e.target.value})}></input></td>
                            <td><input type='number' className='form-control'disabled value={storageValues.storage55} onChange={(e)=>setStorageValues({...storageValues,storage55:e.target.value})}></input></td>
                        </tr>
                    </tbody>
                </table>
                <textarea rows={10} type='text' placeholder='comment' className='form-control mt-2 mb-2' value={storageValues.storage6} onChange={(e)=>setStorageValues({...storageValues,storage6:e.target.value})}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-success' onClick={() => { saveComment() }}>تعديل</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Storage;