<template>
  <div class="sign-form">
    <a
      href="#"
      class="close close--white"
      @click.prevent="$emit('closeModal')"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form>
      <div class="sign-form__input">
        <Input
          inputType="email"
          inputLabel="E-mail"
          inputName="email"
          :inputValue="model.email"
          inputPlaceholder="example@mail.ru"
          @update:onInput="model.email = $event"
        />
      </div>

      <div class="sign-form__input">
        <Input
          inputType="password"
          inputName="pass"
          inputLabel="Пароль"
          autocomplete="current-password"
          :inputValue="model.password"
          inputPlaceholder="***********"
          @update:onInput="model.password = $event"
        />
      </div>
      <Button
        buttonClass="button"
        buttonText="Авторизоваться"
        @click="loginButtonClick"
      />
    </form>
  </div>
</template>

<script>
  import Input from '@/common/input/Input.vue';
  import Button from '@/common/button/Button.vue';
  import {authorise} from '@/services/authorisation.service';
  import {reactive} from 'vue';
  import {getUserData} from '@/services/user.service';

  export default {
    name: 'Login',
    methods: {authorise},
    components: {Button, Input},
    emits: ['closeModal'],
    setup(props, {emit}) {
      const model = reactive({
        email: '',
        password: '',
      });

      const loginButtonClick = async () => {
        await authorise(model);
        await getUserData();
        emit('closeModal');
      };

      return {
        model,
        loginButtonClick,
      };
    },
  };

</script>

<style scoped>

</style>
