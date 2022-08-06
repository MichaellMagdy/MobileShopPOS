const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');
var mysql = require('mysql');



router.post('/addPayment', async (data, res) => {
    mysqlConnection.query(`INSERT INTO salesdb.sales
(payment,status,comment)
VALUES
(${data.body.payment},${data.body.status},'${data.body.note}');`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/addPaymentNote', async (data, res) => {
    mysqlConnection.query(`INSERT INTO salesdb.private_notes
(name,amount,note,state)
VALUES
('${data.body.name}',${data.body.amount},'${data.body.note}',${data.body.state});`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/addPaymentCredit', async (data, res) => {
    mysqlConnection.query(`INSERT INTO salesdb.sales
(payment,status)
VALUES
(${data.body.credit},9);`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getAllSales', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.sales_view;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getCredit', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.credit;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getSelectedDate', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.sales_view where date='${data.body.selectedDate}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getnotesdata', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.private_notes where state=${data.body.status};
    SELECT *,sum(amount) as total FROM salesdb.private_notes where state='${data.body.status}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getDayTotal', async (data, res) => {
    mysqlConnection.query(`SELECT *,sum(payment) as total FROM salesdb.sales_view where date='${data.body.selectedDate}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


router.post('/getAdminData', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.admintable;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/removePayment', async (data, res) => {
    mysqlConnection.query(`delete FROM salesdb.sales where id=${data.body.id};`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/getStorageData', async (data, res) => {
    mysqlConnection.query(`SELECT * FROM salesdb.types; SELECT * FROM salesdb.admintable;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


router.post('/removePaymentNote', async (data, res) => {
    mysqlConnection.query(`delete FROM salesdb.private_notes where id=${data.body.id};`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/changePass', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set pass='${data.body.newPass}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/editPaymentNote', async (data, res) => {
    mysqlConnection.query(`update salesdb.private_notes set name='${data.body.name}',amount='${data.body.amount}',note='${data.body.note}' where id=${data.body.id};`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/updateCredit', async (data, res) => {
    mysqlConnection.query(`update salesdb.credit set available=${data.body.available},rest=${data.body.rest} where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/updateNote1', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set note1='${data.body.tempcomment}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/updateNote2', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set note2='${data.body.tempcomment}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/updateNote3', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set note3='${data.body.tempcomment}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/updateNote4', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set note4='${data.body.tempcomment}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
router.post('/updateNote5', async (data, res) => {
    mysqlConnection.query(`update salesdb.admintable set note5='${data.body.tempcomment}' where id=1;`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
module.exports = router;