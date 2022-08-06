import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';
import AddSalesPayment from '../components/AddSalesPayment';
import GetAllSales from '../components/GetAllSales';
import CreditModal from '../components/CreditModal';

function Home(props) {




    const [showPayment, setShowPayment] = useState(false);
    const [showSales, setShowSales] = useState(false);
    const [showCredit, setShowCredit] = useState(false);

    const [paymentstatus, setPaymentstatus] = useState(0);

    const handleClose = () => setShowPayment(false);
    const handleCloseSales = () => setShowSales(false);
    const handleCloseCredit = () => setShowCredit(false);

    const addPayment = (status) => {
        setShowPayment(true);
        setPaymentstatus(status)
    };

    const showAllSales = () => {
        let pass = prompt('ادخل كلمة المرور')
        if (pass == adminPass) {

            setShowSales(true);
        } else {
            alert('wrong Password....')
        }

    };

    const [adminPass, setAdminPass] = useState();
    useEffect(() => {
        axios.post("http://localhost:3001/sales/getAdminData").then((response) => {

            // console.log(response.data);
            setAdminPass(response.data[0]['pass']);

        });
    }, []);

    return (
        <div>
            <div className='text-left row justify-content-around' dir='rtl' >
                <AddSalesPayment
                    show={showPayment}
                    closemodal={handleClose}
                    status={paymentstatus}
                />
                <CreditModal 
                    show={showCredit}
                    closemodal={handleCloseCredit}

                />
                <GetAllSales
                    show={showSales}
                    closeModal={handleCloseSales}
                    pass={adminPass}
                    setAdminPass={setAdminPass}
                />
                <div className='col-12'>
                    <div className='row justify-content-around mt-5'>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(1) }}>جراب</Button>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(2) }}>اسكرينة</Button>
                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(3) }}>سماعة</Button>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(4) }}>Cable</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(5) }}>شاحن</Button>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(6) }}>Accessories</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(7) }}>used</Button>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { addPayment(8) }}>جديد</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="primary" className='form-control btn-lg' onClick={() => { setShowCredit(true) }}>رصيد + شحن</Button>
                        <Button style={{ 'width': '30%' }} variant="danger" className='form-control btn-lg' onClick={() => { showAllSales() }}>private</Button>

                    </div>

                </div>


            </div>
        </div>
    )
}
export default Home;