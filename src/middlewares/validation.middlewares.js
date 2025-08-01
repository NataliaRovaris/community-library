
import { bookIdSchema } from '../schema/book.schema.js';
import { loanIdSchema } from '../schema/loan.schema.js';
import { userIdSchema } from '../schema/user.schema.js';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({error: err.errors});
    }
};

const validateUserId = (req, res, next) => {
    try {
        const userId = +req.params.id;
        userIdSchema.parse({ userId: userId });
        next();
    } catch (err) {
        res.status(400).json({error: err.errors});
    }
}

const validateBookId = (req, res, next) => {
    try {
        bookIdSchema.parse({ bookId: +req.params.id });
        next();
    } catch (err) {
        res.status(400).json({error: err.errors})
    }
}

const validateLoanId = (req, res, next) => {
    try {
        loanIdSchema.parse({ loanId: +req.params.id });
        next();
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
};

export { 
    validate,
    validateUserId,
    validateBookId,
    validateLoanId
};