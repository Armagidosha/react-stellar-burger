import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { useDispatch } from '../../utils/hooks';
import { postRegistration } from '../../services/actions/user';
import { FormEvent } from 'react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { inputs, handleChange } = useInput({
    email: '',
    password: '',
    name: ''
  })

  const submit = async (evt: FormEvent) => {
    evt.preventDefault()
    dispatch(postRegistration(inputs))
  }

  return (
    <form onSubmit={submit} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Регистрация
      </h2>
      <Input
        placeholder='Имя'
        type='text'
        value={inputs.name}
        onChange={handleChange}
        name='name'
        autoFocus
        autoComplete='name'
      />
      <EmailInput
        placeholder='E-mail'
        value={inputs.email}
        onChange={handleChange}
        name='email'
        autoComplete='one-time-code'
      />
      <PasswordInput
        placeholder='Пароль'
        value={inputs.password}
        onChange={handleChange}
        name='password'
        autoComplete='new-password'
      />
      <Button
        disabled={!inputs.email.length || !inputs.name.length || inputs.password.length < 6}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Зарегистрироваться
      </Button>
      <p className={`${styles.subText} text text_type_main-default`}>
        Уже зарегистрированы?
        <Link
          to={path.login}
          className={styles.subLink}>
          &nbsp;Войти
        </Link>
      </p>
    </form>
  )
}

export default RegisterPage;