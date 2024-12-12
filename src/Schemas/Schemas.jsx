
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  fullname: Yup.string().min(2)
});

