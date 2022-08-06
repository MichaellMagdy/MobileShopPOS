import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';


function AddSalesPayment(props) {

    const [payment, setPayment] = useState({
        paymentamount:0,
        paymentnote:''
    })


    function savePayment() {

        var data = {
            status: props.status,
            payment: payment.paymentamount,
            note: payment.paymentnote,
        }
        // console.log(data)

        axios.post("http://localhost:3001/sales/addPayment", data).then(() => {
            // alert('تمت العملية بنجاح')
            props.closemodal()
        });
    }

    return (


        <Modal show={props.show} onHide={props.closemodal} onShow={() => { setPayment({...payment,paymentamount:0,paymentnote:''}) }} size='sm' autoFocus='true' centered>
            <Modal.Header closeButton>
                <Modal.Title>المبلغ المدفوع</Modal.Title>
            </Modal.Header>
            <Modal.Body dir='rtl'>
                <lable>السعر</lable>
                <input type='number' onChange={(e) => { setPayment({...payment,paymentamount:e.target.value}) }}  className='form-control mt-2 mb-2' value={payment.paymentamount}></input>
                <lable>اسم المنتج</lable>
                
                <input type='text' onChange={(e) => { setPayment({...payment,paymentnote:e.target.value})}} placeholder='comment' className='form-control mt-2 mb-2' value={payment.paymentnote}></input>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-success' onClick={() => { savePayment() }}>تأكيد</button>
            </Modal.Footer>
        </Modal>


    )
}

export default AddSalesPayment;