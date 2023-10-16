import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './recover-password.module.css'
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { recoverForgotPassword } from '../../utils/api';
import { FormEvent } from 'react';

const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const { inputs, handleChange } = useInput({
    password: '',
    token: ''
  })

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    recoverForgotPassword(inputs).then(() => {
      navigate(path.login)
      localStorage.removeItem('recover-password-access')
    })
  }

  return localStorage.getItem('recover-password-access') ? (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <PasswordInput
        placeholder='Пароль'
        value={inputs.password}
        onChange={handleChange}
        name='password'
        autoFocus
        autoComplete='new-password'
      />
      <Input
        placeholder={'Введите код из письма'}
        type='text'
        value={inputs.token}
        onChange={handleChange}
        name='token'
        autoComplete='one-time-code'
      />
      <Button
        disabled={!inputs.password.length || !inputs.token.length}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Сохранить
      </Button>
      <div className={`${styles.subContainer} mt-20`}>
        <p className={`${styles.subText} text text_type_main-default`}>
          Вспомнили пароль?
          <Link className={styles.subLink}
            to={path.login}
          >
            &nbsp;Войти
          </Link>
        </p>
      </div>
    </form>
  ) : <Navigate to={'/'} />
}

export default RecoverPasswordPage;