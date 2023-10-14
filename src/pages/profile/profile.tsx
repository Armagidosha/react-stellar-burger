import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useInput } from '../../utils/hooks';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileAnchors from '../../components/profile/profileAnchors';
import { useSelector } from '../../utils/hooks';
import { patchUserData } from '../../utils/api';
import { FormEvent } from 'react';

const ProfilePage = () => {
  const user = useSelector(store => store.user.user)
  const { inputs, handleChange } = useInput({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  })

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    patchUserData(inputs)
  }

  return (
    <section className={styles.container}>
      <div>
        <ProfileAnchors />
        <p className={`${styles.sub} mt-20 pl-10 text text_type_main-default`} >
          В этом разделе вы можете
          изменить&nbsp;свои персональные данные
        </p>
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          placeholder='Имя'
          value={inputs.name}
          onChange={handleChange}
          name='name'
          extraClass='mb-6'
        />
        <EmailInput
          placeholder='Логин'
          value={inputs.email}
          onChange={handleChange}
          name='email'
          extraClass='mb-6' />
        <PasswordInput
          placeholder='Пароль'
          value={inputs.password}
          onChange={handleChange}
          name='password'
        />
        <div className={`${styles.buttonContainer} pt-6`}>
          <Button
            disabled={!inputs.email.length || !inputs.name.length || inputs.password.length < 6}
            htmlType='submit'
            type='primary'
            size='medium'
            extraClass={styles.button}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ProfilePage;