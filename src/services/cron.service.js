import cron from 'node-cron'
import moment from 'moment';
import loanRepository from '../repositories/loan.repositories.js'
import userRepository from '../repositories/user.repositories.js'
import bookRepository from '../repositories/book.repositories.js'
import sendEmail from './email.service.js';

cron.schedule('35 * * * *', async () => {
    console.log("Running daily job to check for due dates...");
    const loans = await loanRepository.findAllLoansRepository();
    const today = moment().startOf('day');

    loans.forEach(async (loan) => {
        const dueDate = moment(loan.dueDate).startOf('day');
        const reminderDueDate = moment(dueDate).subtract(4, 'days');
        console.log(reminderDueDate);
        if(today.isSame(reminderDueDate)){
            sendEmail(loan.email, loan.title, loan.dueDate)
        }
    })
});