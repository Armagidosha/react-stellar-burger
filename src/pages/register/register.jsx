import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../utils/hooks';
import { path } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { postRegistration } from '../../services/actions/user';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { inputs, handleChange } = useInput({
    email: '',
    password: '',
    name: ''
  })

  const submit = async (e) => {
    e.preventDefault();
    dispatch(postRegistration(inputs))
  }

  return (
    <form onSubmit={e => submit(e)} className={styles.container}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Регистрация
      </h2>
      <Input
        placeholder={'Имя'}
        type={'text'}
        value={inputs.name}
        onChange={e => handleChange(e)}
        name={'name'}
      />
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