import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server start on port : ".concat(PORT));
});
//# sourceMappingURL=index.js.map