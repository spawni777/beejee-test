import styles from '@/styles/pages/login.module.scss';
import InputUI from '@/components/UI/InputUI.jsx';
import ButtonUI from '@/components/UI/ButtonUI.jsx';
import { postLoginAPI } from '@/api/users.js';
import { useNavigate } from 'react-router-dom';
import useLoginForm from '@/hooks/useLoginForm.js';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    validationSchemas,
  } = useLoginForm();

  const login = async (form) => {
    try {
      await postLoginAPI(form);
      navigate('/admin');
    } catch (e) {
      alert('Authorization has been refused for those credentials.');
    }
  }

  return (
    <div className={ styles.login }>
      <h1>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit(login)}>
        <InputUI
          placeholder="username"
          name="username"
          register={register}
          validationSchema={validationSchemas['username']}
        />
        {errors.username?.type === 'required' && <div className="formError"> {errors.username?.message}</div>}
        {errors.username?.type === 'minLength' && <div className="formError"> {errors.username?.message}</div>}

        <InputUI
          placeholder="password"
          type="password"
          name="password"
          register={register}
          validationSchema={validationSchemas['password']}
        />
        {errors.password?.type === 'required' && <div className="formError"> {errors.password?.message}</div>}
        {errors.password?.type === 'minLength' && <div className="formError"> {errors.password?.message}</div>}

        <div className={styles.formBtnContainer}>
          <ButtonUI type="submit">LOG IN</ButtonUI>
        </div>
      </form>
    </div>
  )
}

export default Login;
