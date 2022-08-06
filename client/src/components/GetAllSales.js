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

function GetAllSales(props) {



    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            // console.log(row['id'])
            if (window.confirm('هل انت واثق من الحذف؟')) {
                let data = {
                    id: row['id']
                }
                axios.post("http://localhost:3001/sales/removePayment", data).then((response) => {

                    // console.log(response.data);
                    setListofsales({});
                    setTotal(0)
                    setSelectedDate('')
                });
            }

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
        { dataField: 'id', text: 'id', sort: true, filter: textFilter() },
        { dataField: 'payment', text: 'المبلغ', sort: true, filter: textFilter() },
        { dataField: 'type_name', text: 'الصنف', sort: true, filter: textFilter() },
        { dataField: 'date', text: 'تاريخ اليوم', sort: true, filter: textFilter(), hidden: true },
        { dataField: 'comment', text: 'اسم المنتج', sort: true, filter: textFilter() },

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


    const [listofsales, setListofsales] = React.useState()

    useEffect(() => {
        // console.log(props)

        axios.post("http://localhost:3001/sales/getAllSales").then((response) => {

            // console.log(response.data);
            setListofsales(response.data);
        });
    }, []);

    const getSelectedData = (inputValue) => {
        // console.log(inputValue)
        var data = {
            selectedDate: inputValue
        }
        axios.post("http://localhost:3001/sales/getSelectedDate", data).then((response) => {

            // console.log(response.data);
            setListofsales(response.data);
        });
        axios.post("http://localhost:3001/sales/getDayTotal", data).then((response2) => {

            // console.log(response2.data);
            if (response2.data[0]['total'] != null) {

                setTotal(response2.data[0]['total']);
            } else {
                setTotal(0)
            }
        });
    }

    const changePassword = () => {
        let oldPass = prompt('ادخل كلمة المرور القديمة')
        if (oldPass == props.pass) {
            let newPass = prompt('ادخل كلمة المرور الجديدة')
            let data = {
                newPass: newPass
            }
            axios.post("http://localhost:3001/sales/changePass", data).then((response) => {
                alert('password changed')
                props.setAdminPass(newPass)
            });
        } else {
            alert('wrong Password...')
        }
    }

    const [selectedDate, setSelectedDate] = useState('');
    const [total, setTotal] = useState(0);


    return (

        <Modal show={props.show} onHide={props.closeModal} size="lg"
            onShow={() => { setSelectedDate('') }}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>المبيعات</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ui centered grid">
                    <div className='row justify-content-around'>
                        <input value={selectedDate} onChange={(e) => {
                            setSelectedDate(e.target.value)
                            getSelectedData(e.target.value)
                        }} className='form-control' style={{ 'width': '80%', 'textAlign': 'center' }} type='date'></input>
                        <h3 className='mt-4'>مجموع مبيعات اليوم</h3>
                        <input className='form-control' value={total} style={{ 'width': '80%', 'textAlign': 'center' }} disabled></input>
                    </div>
                    <div className="center aligned row">
                        <h1>المبيعات</h1>
                        <ToolkitProvider
                            bootstrap4
                            keyField='id'
                            columns={columns}
                            data={listofsales}
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
                <button className='btn btn-danger' onClick={() => { changePassword() }}>change Password</button>
            </Modal.Footer>
        </Modal >

    )
    // }


}
export default GetAllSales;
