import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';


function CreditModal(props) {

    const [payment, setPayment] = useState({
        available:0,
        rest:0
    })
    function setvalues(){
        axios.post("http://localhost:3001/sales/getCredit").then((res) => {
            setPayment({...payment,available:res.data[0]['available'],rest:res.data[0]['rest']})
        });
    }


    function savePayment() {

        var data = {
            credit:payment.available-payment.rest
        }
        // console.log(data)

        axios.post("http://localhost:3001/sales/addPaymentCredit", data).then(() => {
            // alert('تمت العملية بنجاح')
            props.closemodal()
        });
    }

    function saveCredit() {

        var data = payment
        // console.log(data)

        axios.post("http://localhost:3001/sales/updateCredit", data).then(() => {
            // alert('تمت العملية بنجاح')
            props.closemodal()
        });
    }
    return (


        <Modal show={props.show} onHide={props.closemodal} onShow={() => { setvalues() }} size='sm' autoFocus='true' centered>
            <Modal.Header closeButton>
                <Modal.Title>رصيد</Modal.Title>
            </Modal.Header>
            <Modal.Body dir='rtl'>
                <lable>المبلغ المتاح</lable>
                <input type='number' onChange={(e) => { setPayment({...payment,available:e.target.value}) }}  className='form-control mt-2 mb-2' value={payment.available}></input>
                <lable>المبلغ المتبقي</lable>
                
                <input type='text' onChange={(e) => { setPayment({...payment,rest:e.target.value})}} placeholder='comment' className='form-control mt-2 mb-2' value={payment.rest}></input>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-danger' onClick={() => { savePayment() }}> تأكيد اليوم</button>
                <button className='btn btn-success' onClick={() => { saveCredit() }}> حفظ المبالغ</button>
            </Modal.Footer>
        </Modal>


    )
}

export default CreditModal;