import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';
import SalesNotes from '../components/SalesNotes';
import Storage from '../components/Storage';

function Home(props) {



    const [showNotes, setShowNotes] = useState(false);
    const [showStorage, setShowStorage] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [notes, setNotes] = useState();
    const [noteStatus, setNoteStatus] = useState(0);

    const handleCloseNotes = () => setShowNotes(false);
    const handleCloseStorage = () => setShowStorage(false);

    useEffect(() => {
        axios.post("http://localhost:3001/sales/getAdminData").then((response) => {

            // console.log(response.data);
            setNotes(response.data[0]);

        });
    }, []);

    const getStorage = () => {
        let pass = prompt('ادخل كلمة المرور')
        if (pass == notes['pass']) {
            setShowStorage(true)
        } else {
            alert('wrong Password....')
        }
    };

    const getNote = (status) => {
        if (status == 1) {
            setTitle('الديون')
            setText(notes['note1'])
            setNoteStatus(1)
        } else if (status == 2) {
            setTitle('تجار')
            setText(notes['note2'])
            setNoteStatus(2)

        } else if (status == 3) {
            setTitle('دخول اجهزة')
            setText(notes['note3'])
            setNoteStatus(3)

        } else if (status == 4) {
            setTitle('فواتير')
            setText(notes['note4'])
            setNoteStatus(4)

        } else if (status == 5) {
            setTitle('مرتبات')
            setText(notes['note5'])
            setNoteStatus(5)

        }
        let pass = prompt('ادخل كلمة المرور')
        if (pass == notes['pass']) {
            setShowNotes(true)
        } else {
            alert('wrong Password....')
        }
    };

    return (
        <div>
            <div className='text-left row justify-content-around' dir='rtl' >
                <div className='col-12'>
                    <Storage 
                        show={showStorage}
                        closemodal={handleCloseStorage}
                    />
                    <SalesNotes
                        show={showNotes}
                        closemodal={handleCloseNotes}
                        title={title}
                        text={text}
                        noteStatus={noteStatus}
                        setNotes={setNotes}
                    />
                    <div className='row justify-content-around mt-5'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getNote(1) }}>الديون</Button>
                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getNote(2) }}>تجار</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getNote(3) }}>دخول اجهزة</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getNote(4) }}>فواتير</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getNote(5) }}>مرتبات</Button>

                    </div>
                    <div className='row justify-content-around mt-4'>
                        <Button style={{ 'width': '30%' }} variant="success" className='form-control btn-lg' onClick={() => { getStorage() }}>المخزن</Button>

                    </div>

                </div>


            </div>
        </div>
    )
}
export default Home;