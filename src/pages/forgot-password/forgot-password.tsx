import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { resetForgotPassword } from '../../utils/api';
import { FormEvent } from 'react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate()

  const { inputs, handleChange } = useInput({
    email: '',
  })

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    resetForgotPassword(inputs).then(() => {
      localStorage.setItem("recover-password-access", 'true')
      navigate(path.recover)
    }
    )
  }

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <EmailInput
        placeholder='Укажите e-mail'
        value={inputs.email}
        onChange={handleChange}
        name='email'
        autoFocus
        autoComplete='email'
      />
      <Button
        disabled={inputs.email.length < 3}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Восстановить
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
  )
}

export default ForgotPasswordPage;