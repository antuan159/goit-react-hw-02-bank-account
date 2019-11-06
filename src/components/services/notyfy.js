import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notSumm = () => toast('Введите сумму для проведения операции!');
const lackOfBalance = () =>
  toast('На счету недостаточно средств для проведения операции!');
const negativeBalance = () =>
  toast('Введён отрицательный баланс попробуйте снова');

export default { notSumm, lackOfBalance, negativeBalance };
