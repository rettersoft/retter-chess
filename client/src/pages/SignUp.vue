<template>
  <q-page class="row items-center justify-evenly">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square style="width: 500px">
          <q-card-section>
            <div class="text-h6">Sign Up</div>
            <div class="text-subtitle2">
              If you already have an account please
              <a href="javascript:" @click="toSignIn">click</a>..
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              :autofocus="true"
            >
              <q-input
                type="text"
                v-model="name"
                label="Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type your name',
                ]"
              />
              <q-input
                type="email"
                v-model="email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type your email',
                ]"
              />
              <q-input
                type="password"
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please type your password',
                ]"
              />
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="secondary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RioClasses } from '../libs/rio';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import Retter from '@retter/sdk';

export default defineComponent({
  name: 'PageSignUp',
  components: {},
  props: ['rio', 'userProfile'],
  setup(props) {
    const $q = useQuasar();
    const $router = useRouter();
    $q.loading.hide();

    if (props.userProfile.online) $router.push('/');

    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    return {
      name,
      email,
      password,

      async onSubmit() {
        try {
          $q.loading.show();
          const user = await RioClasses.User.getInstance(props.rio as Retter);
          await user.signUp({
            name: name.value!,
            email: email.value!,
            password: password.value!,
          });
          $router.push('/sign-in');
        } catch (e: any) {
          $q.loading.hide();
          $q.notify({
            color: 'negative',
            message: e?.response?.body?.message || 'Something went wrong :(',
          });
        }
      },

      onReset() {
        name.value = null;
        email.value = null;
        password.value = null;
      },

      toSignIn() {
        $router.push('/sign-in');
      },
    };
  },
});
</script>
