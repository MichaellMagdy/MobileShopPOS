import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BootStrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import Modal from 'react-bootstrap/Modal';
import AddPrivatePayment from './AddPrivateNote';


function SalesNotes(props) {

    const [selectedrow, setsSelectedrow] = React.useState()


    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            // console.log(row['id'])
            // if (window.confirm('هل انت واثق من الحذف؟')) {
                setEditflag(1)
                setShowPayment(true)
                setsSelectedrow(row)
                let data = {
                    id: row['id']
                }
                // axios.post("http://localhost:3001/sales/removePayment", data).then((response) => {

                //     // console.log(response.data);
                //     setListofsales({});
                //     setTotal(0)
                //     setSelectedDate('')
                // });
            // }

        }
    };

    const { ExportCSVButton } = CSVExport;
    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        }
        return (
            <div>
                <button className="btn btn-success" onClick={handleClick}>Export to excel</button>
            </div>
        );
    };

    const columns = [
        { dataField: 'id', text: 'id', sort: true, filter: textFilter(),hidden:true },
        { dataField: 'name', text: 'الاسم', sort: true, filter: textFilter() },
        { dataField: 'amount', text: 'المبلغ', sort: true, filter: textFilter() },
        { dataField: 'note', text: 'ملحوظة', sort: true, filter: textFilter() },

    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            // console.log('page', page);
            // console.log('sizeperpage', sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {
            // console.log('page', page);
            // console.log('sizeperpage', sizePerPage)
        }
    });


    const [listOfNotes, setListOfNotes] = React.useState()

    useEffect(() => {
        // console.log(props)

        axios.post("http://localhost:3001/sales/getAllSales").then((response) => {

            // console.log(response.data);
            setListOfNotes(response.data);
        });
    }, []);

    // const getSelectedData = (inputValue) => {
    //     // console.log(inputValue)
    //     var data = {
    //         selectedDate: inputValue
    //     }
    //     axios.post("http://localhost:3001/sales/getSelectedDate", data).then((response) => {

    //         // console.log(response.data);
    //         setListofsales(response.data);
    //     });
    //     axios.post("http://localhost:3001/sales/getDayTotal", data).then((response2) => {

    //         // console.log(response2.data);
    //         if (response2.data[0]['total'] != null) {

    //             setTotal(response2.data[0]['total']);
    //         } else {
    //             setTotal(0)
    //         }
    //     });
    // }

    

    const [total, setTotal] = useState(0);
    const [editflag, setEditflag] = useState(0);

    function getAvailableData(){
        // console.log(props)
        var data={
            status:props.noteStatus
        }
        axios.post("http://localhost:3001/sales/getnotesdata",data).then((response) => {

            console.log(response.data);
            setListOfNotes(response.data[0]);
            setTotal(response.data[1][0]['total'])
        });
    }
    const [showPayment, setShowPayment] = useState(false);
    const handleClose = () => setShowPayment(false);


    return (

        <Modal show={props.show} onHide={props.closemodal} size="lg"
            onShow={() => { getAvailableData() }}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddPrivatePayment
                    show={showPayment}
                    closemodal={handleClose}
                    status={props.noteStatus}
                    getAvailableData={getAvailableData}
                    editflag={editflag}
                    selectedrow={selectedrow}
                    setEditflag={setEditflag}
                />
                <div className="ui centered grid">
                    <div className='row justify-content-around'>
                        <h3 className='mt-4'>مجموع </h3>
                        <input className='form-control' value={total} style={{ 'width': '80%', 'textAlign': 'center' }} disabled></input>
                    </div>
                    <div className="center aligned row" dir='rtl'>
                        <h1>{props.title}</h1>
                        <ToolkitProvider
                            bootstrap4
                            keyField='id'
                            columns={columns}
                            data={listOfNotes}
                            exportCSV={{
                                noAutoBOM: false,
                                onlyExportFiltered: true,
                                exportAll: false

                            }

                            }

                        >{props => (
                            <React.Fragment>
                                <BootStrapTable
                                    striped bordered size='sm' hover responsive
                                    pagination={pagination}
                                    filter={filterFactory()}
                                    {...props.baseProps}
                                    selectRow={selectRow}

                                />
                                {/* <MyExportCSV {...props.csvProps} /> */}

                            </React.Fragment>
                        )}
                        </ToolkitProvider>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-warning btn-lg' onClick={()=>setShowPayment(true)}>إضافة جديد</button>
            </Modal.Footer>
        </Modal >

    )
    // }


}

//     const [commentText, setCommentText] = useState(props.text)

//     function saveComment() {


//         var data = {
//             tempcomment: commentText,
//         }
//         if (props.noteStatus == 1) {
//             axios.post("http://localhost:3001/sales/updateNote1", data).then(() => {
//                 axios.post("http://localhost:3001/sales/getAdminData").then((response) => {
//                     props.setNotes(response.data[0]);
//                     props.closemodal()
//                     alert('تم حفظ البيانات')
//                 });
//             });
//         } else if (props.noteStatus == 2) {
//             axios.post("http://localhost:3001/sales/updateNote2", data).then(() => {
//                 axios.post("http://localhost:3001/sales/getAdminData").then((response) => {
//                     props.setNotes(response.data[0]);
//                     props.closemodal()
//                     alert('تم حفظ البيانات')
//                 });
//             });
//         } else if (props.noteStatus == 3) {
//             axios.post("http://localhost:3001/sales/updateNote3", data).then(() => {
//                 axios.post("http://localhost:3001/sales/getAdminData").then((response) => {
//                     props.setNotes(response.data[0]);
//                     props.closemodal()
//                     alert('تم حفظ البيانات')
//                 });
//             });
//         } else if (props.noteStatus == 4) {
//             axios.post("http://localhost:3001/sales/updateNote4", data).then(() => {
//                 axios.post("http://localhost:3001/sales/getAdminData").then((response) => {
//                     props.setNotes(response.data[0]);
//                     props.closemodal()
//                     alert('تم حفظ البيانات')
//                 });
//             });
//         } else if (props.noteStatus == 5) {
//             axios.post("http://localhost:3001/sales/updateNote5", data).then(() => {
//                 axios.post("http://localhost:3001/sales/getAdminData").then((response) => {
//                     props.setNotes(response.data[0]);
//                     props.closemodal()
//                     alert('تم حفظ البيانات')
//                 });
//             });
//         }



//     }

//     return (
//         <Modal show={props.show} onHide={props.closemodal} size='lg' autoFocus='true' onShow={() => { setCommentText(props.text) }} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>{props.title}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body dir='rtl'>
//                 <textarea rows={10} type='text' onChange={(e) => { setCommentText(e.target.value) }} placeholder='comment' className='form-control mt-2 mb-2' value={commentText}></textarea>
//             </Modal.Body>
//             <Modal.Footer>
//                 <button className='btn btn-success' onClick={() => { saveComment() }}>تأكيد</button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

export default SalesNotes;