import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';


function AddPrivatePayment(props) {

    const [payment, setPayment] = useState({
        paymentname:'',
        paymentamount:0,
        paymentnote:''
    })
 // asdfadsfadsfasdlfjasjdhashj;fj;ahsdf

    function savePayment() {

        if(props.editflag==1){
            var data = {
                id: props.selectedrow.id,
                amount: payment.paymentamount,
                note: payment.paymentnote,
                name:payment.paymentname
            }
            // console.log(data)
    
            axios.post("http://localhost:3001/sales/editPaymentNote", data).then(() => {
                // alert('تمت العملية بنجاح')
                props.closemodal()
                props.getAvailableData()
                props.setEditflag(0)
            });
        }else{

            var data = {
                state: props.status,
                amount: payment.paymentamount,
                note: payment.paymentnote,
                name:payment.paymentname
            }
            // console.log(data)
    
            axios.post("http://localhost:3001/sales/addPaymentNote", data).then(() => {
                // alert('تمت العملية بنجاح')
                props.closemodal()
                props.getAvailableData()
            });
        }
    }

    function removerecord(){
        var data = {
            id: props.selectedrow.id,
        }
        // console.log(data)

        axios.post("http://localhost:3001/sales/removePaymentNote", data).then(() => {
            // alert('تمت العملية بنجاح')
            props.closemodal()
            props.getAvailableData()
        });
    }


    console.log(props)

    function setstartdata(){
        if(props.editflag==1){
            setPayment({...payment,paymentamount:props.selectedrow.amount,paymentnote:props.selectedrow.note,paymentname:props.selectedrow.name})
        }else{
            setPayment({...payment,paymentamount:0,paymentnote:'',paymentname:''})
        }
    }
    return (


        <Modal show={props.show} onHide={()=>{props.closemodal() ;props.setEditflag(0)}} onShow={() => { setstartdata() }} size='sm' autoFocus='true' centered>
            <Modal.Header closeButton>
                <Modal.Title>المبلغ المدفوع</Modal.Title>
            </Modal.Header>
            <Modal.Body dir='rtl'>
            <lable>الاسم</lable>
                
                <input type='text' onChange={(e) => { setPayment({...payment,paymentname:e.target.value})}} placeholder='name' className='form-control mt-2 mb-2' value={payment.paymentname}></input>
                <lable>المبلغ</lable>
                <input type='number' onChange={(e) => { setPayment({...payment,paymentamount:e.target.value}) }}  className='form-control mt-2 mb-2' value={payment.paymentamount}></input>
                <lable>ملحوظة</lable>
                
                <input type='text' onChange={(e) => { setPayment({...payment,paymentnote:e.target.value})}} placeholder='comment' className='form-control mt-2 mb-2' value={payment.paymentnote}></input>
            </Modal.Body>
            <Modal.Footer>
                {(props.editflag==1)?<button className='btn btn-danger' onClick={() => { removerecord() }}>حذف</button>:''}
                <button className='btn btn-success' onClick={() => { savePayment() }}>تأكيد</button>
            </Modal.Footer>
        </Modal>


    )
}

export default AddPrivatePayment;