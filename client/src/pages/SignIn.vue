<template>
  <q-page class="row items-center justify-evenly">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square style="width: 500px">
          <q-card-section>
            <div class="text-h6">Sign In</div>
            <div class="text-subtitle2">
              If you don't have an account please
              <a href="javascript:" @click="toSignUp">click</a>.
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
  name: 'PageSignIn',
  components: {},
  props: ['rio', 'userProfile'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const $router = useRouter();
    $q.loading.hide();

    const email = ref(null);
    const password = ref(null);

    if (props.userProfile.online) $router.push('/');

    return {
      email,
      password,

      async onSubmit() {
        try {
          $q.loading.show();
          const user = await RioClasses.User.getInstance(props.rio as Retter, {
            classId: 'User', //? eslint forces to provide classId :\
            key: { name: 'email', value: email.value! },
          });
          user
            .signIn({ password: password.value! })
            .then((r) => emit('custom-token', r.customToken));
        } catch (e: any) {
          console.log(e);
          $q.loading.hide();
          $q.notify({
            color: 'negative',
            message: e?.response?.body?.message || 'Something went wrong :(',
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },

      toSignUp() {
        $router.push('/sign-up');
      },
    };
  },
});
</script>
