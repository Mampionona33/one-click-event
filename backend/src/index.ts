import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
