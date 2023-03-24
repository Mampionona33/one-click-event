import express from 'express';
import { router as userRoutes } from './routes/userRoutes.js';
var app = express();
app.get('/', function (req, res, next) {
    res.send('response form back');
    next();
});
app.use(process.env.USER_BASED_URL, userRoutes);
export default app;
//# sourceMappingURL=app.js.map