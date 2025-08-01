import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        bookId INTEGER,
        dueDate DATE,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (bookId) REFERENCES books(id)
    )    
`)

function createLoanRepository(userId, bookId, dueDate) {
    return new Promise((res, rej) => {
        db.run(
            `INSERT INTO loans (userId, bookId, dueDate) VALUES (?, ?, ?)`,
            [userId, bookId, dueDate],
            function (err) {
                if (err) {
                    rej(err);
                } else {
                    res({ id: this.lastID, userId, bookId});
                }
            }
        )
    });
}

function findAllLoansRepository () {
    return new Promise((res, rej) => {
        db.all(
            `SELECT * FROM loans`,
            [], 
            (err, rows) => {
                if (err) {
                    rej(err);
                } else {
                    res(rows);
                }
            }
        )
    });
}

function findLoanByIdRepository(loanId) {
    return new Promise((res, rej) => {
        db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
            if (err) {
                rej(err);
            } else {
                res(row);
            }
        });
    });
}

function deleteLoanRepository(loanId) {
    return new Promise((res, rej) => {
        db.get(`DELETE FROM loans WHERE id = ?`, [loanId], function (err) {
            if (err) {
                rej(err);
            } else {
                res({ message: "Loan deleted successfully", loanId });
            }
        });
    });
}

export default {
    createLoanRepository,
    findAllLoansRepository,
    findLoanByIdRepository,
    deleteLoanRepository
}