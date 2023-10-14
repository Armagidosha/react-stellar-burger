import { Link } from 'react-router-dom';
import styles from './login.module.css'
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { useDispatch } from '../../utils/hooks';
import { postLogin } from '../../services/actions/user';
import { FormEvent } from 'react';

const LoginPage = () => {
  const dispatch = useDispatch();

  const { inputs, handleChange } = useInput({
    email: '',
    password: ''
  })

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postLogin(inputs))
  }

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Вход
      </h2>
      <EmailInput
        placeholder='E-mail'
        value={inputs.email}
        onChange={handleChange}
        name='email'
      />
      <PasswordInput
        placeholder='Пароль'
        value={inputs.password}
        onChange={handleChange}
        name='password'
      />
      <Button
        disabled={!inputs.email.length || inputs.password.length < 6}
        htmlType='submit'
        type='primary'
        size='medium'
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