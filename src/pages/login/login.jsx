import { Link } from 'react-router-dom';
import styles from './login.module.css'
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../services/actions/user';

const LoginPage = () => {
  const dispatch = useDispatch();

  const { inputs, handleChange } = useInput({
    email: '',
    password: ''
  })

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postLogin(inputs))
  }

  return (
    <form onSubmit={e => onSubmit(e)} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Вход
      </h2>
      <EmailInput
        placeholder={'E-mail'}
        value={inputs.email}
        onChange={e => handleChange(e)}
        name={'email'}
      />
      <PasswordInput
        placeholder={'Пароль'}
        value={inputs.password}
        onChange={e => handleChange(e)}
        name={'password'}
      />
      <Button
        htmlType={'submit'}
        type={'primary'}
        size={'medium'}
      >
        Войти
      </Button>
      <div className={`${styles.subContainer} mt-20`}>
        <p className={`${styles.subText} text text_type_main-default`}>
          Вы — новый пользователь?
          <Link className={styles.subLink}
            to={path.register}
          >
            &nbsp;Зарегистрироваться
          </Link>
        </p>
        <p className={`${styles.subText} mt-4 text text_type_main-default`}>
          Забыли пароль?
          <Link className={styles.subLink}
            to={path.forgot}
          >
            &nbsp;Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginPage;