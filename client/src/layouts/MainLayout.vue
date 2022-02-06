<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          v-show="userProfile.online"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Retter Chess </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="link"
          title="retter.io"
          @click="openLink('https://retter.io')"
        />
        <q-btn
          flat
          round
          dense
          icon="exit_to_app"
          title="Sign Out"
          v-show="userProfile.online"
          @click="confirmSignOut = true"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list v-if="gameList.length">
        <q-item-label header> {{ userProfile.name }} </q-item-label>

        <q-item v-show="btnGame" clickable @click="promptCreateNewGame = true">
          <q-item-section avatar>
            <q-icon name="add_circle_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Create A New Game </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-show="btnGame" clickable @click="promptJoinGame = true">
          <q-item-section avatar>
            <q-icon name="add_circle_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Join A Game </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <game-list
          v-for="link in gameList"
          :key="link.title"
          v-bind="link"
          @change-game="playGame"
        />
      </q-list>
      <q-list v-else>
        <q-item-label header> {{ userProfile.name }} </q-item-label>

        <q-item v-show="btnGame" clickable @click="promptCreateNewGame = true">
          <q-item-section avatar>
            <q-icon name="add_circle_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Create A New Game </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-show="btnGame" clickable @click="promptJoinGame = true">
          <q-item-section avatar>
            <q-icon name="add_circle_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Join A Game </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-dialog v-model="promptCreateNewGame" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Pick Your Side</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-radio
              v-model="pickedSide"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="white"
              label="White"
            />
            <q-radio
              v-model="pickedSide"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="black"
              label="Black"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              flat
              label="Create"
              color="primary"
              v-close-popup
              @click="createGame"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="promptJoinGame" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Join An Existing Game</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              v-model="joinGameId"
              label="Game Id"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type the game ID',
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              flat
              label="Join"
              color="primary"
              v-close-popup
              @click="joinGame"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirmSignOut" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="exit_to_app" color="primary" text-color="white" />
            <span class="q-ml-sm">Do you really want to sign out?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              flat
              label="Sign Out"
              color="primary"
              v-close-popup
              @click="signOut"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirmChangeGame" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="play_circle_outline"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm">Do you really want to play this game?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              flat
              label="Play"
              color="primary"
              v-close-popup
              @click="playGame(selectedGameId, true)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <router-view
        :currentGameId="currentGameId"
        :rio="rio"
        :userProfile="userProfile"
        @custom-token="customToken"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GameList from 'src/components/GameList.vue';
import RetterIO, { RetterRegion } from '@retter/sdk';
import { defineComponent, ref } from 'vue';
import { RioClasses } from '../libs/rio';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

function detectNewGame(old: any[], updated: any[]): any {
  return updated.find((g) => !old.find((o) => o.gameId === g.gameId));
}

export default defineComponent({
  name: 'MainLayout',

  components: {
    GameList,
  },

  setup() {
    let user: RioClasses.User | undefined = undefined;
    const $q = useQuasar();
    const $router = useRouter();
    $q.loading.show();

    const confirmSignOut = ref(false);
    const confirmChangeGame = ref(false);
    const leftDrawerOpen = ref(false);
    const btnGame = ref(false);
    const promptCreateNewGame = ref(false);
    const pickedSide = ref('white');
    const promptJoinGame = ref(false);
    const joinGameId = ref('');
    const gameList = ref([]);
    const currentGameId = ref('');
    const selectedGameId = ref('');
    const userProfile = ref({
      online: false,
      anonymous: false,
      name: 'Loading...',
      uid: '',
    });
    const rio = ref(
      RetterIO.getInstance({
        projectId: process.env.RETTER_IO_PROJECT_ID!,
        region: RetterRegion.euWest1,
      })
    );

    rio.value.authStatus.subscribe((e) => {
      console.log(e);
      if (e.authStatus === 'SIGNED_OUT') {
        userProfile.value.anonymous = true;
        userProfile.value.online = false;
        leftDrawerOpen.value = false;
        user = undefined;
        $router.push('/sign-in');
      } else if (e.authStatus === 'SIGNED_IN') {
        userProfile.value.anonymous = false;
        userProfile.value.uid = e.uid!;
        $router.push('/');
        if (!user) {
          $q.loading.show();
          RioClasses.User.getInstance(rio.value as RetterIO, {
            classId: 'User',
            instanceId: e.uid,
          })
            .then((u) => {
              user = u;
              u._obj.state?.public.subscribe((s) => {
                console.log(JSON.stringify(s));
                userProfile.value = Object.assign(userProfile.value, {
                  name: s.name,
                });
                if (!currentGameId.value) {
                  currentGameId.value = detectNewGame(
                    gameList.value,
                    s.games as any[]
                  )?.gameId;
                  if (currentGameId.value) $router.push('/game');
                }
                gameList.value = s.games;
                btnGame.value = true;
                userProfile.value.online = true;
                leftDrawerOpen.value = true;

                $q.loading.hide();
              });
            })
            .catch((err) => {
              console.log(err);
              rio.value.signOut();
            });
        }
      } else if (e.authStatus.startsWith('SIGNED_IN')) {
        if (!userProfile.value.anonymous) {
          userProfile.value.anonymous = true;
          userProfile.value.online = false;
          leftDrawerOpen.value = false;
          user = undefined;
          $router.push('/sign-in');
        }
      }
    });

    return {
      pickedSide,
      joinGameId,
      gameList,
      confirmSignOut,
      leftDrawerOpen,
      userProfile,
      btnGame,
      promptCreateNewGame,
      promptJoinGame,
      confirmChangeGame,
      selectedGameId,
      currentGameId,
      rio,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      openLink(url: string) {
        window.open(url, '_blank');
      },
      customToken(token: string) {
        rio.value.authenticateWithCustomToken(token);
      },
      createGame() {
        $q.loading.show();
        RioClasses.Game.getInstance(rio.value as RetterIO, {
          classId: 'Game',
          body: { side: pickedSide.value },
        });
      },
      joinGame() {
        $q.loading.show();
        RioClasses.Game.getInstance(rio.value as RetterIO, {
          classId: 'Game',
          instanceId: joinGameId.value,
        }).then((g) => g.join());
      },
      playGame(gameId: string, force?: boolean) {
        if (gameId === currentGameId.value) return;
        if (force) {
          $q.loading.show();
          currentGameId.value = selectedGameId.value;
          $router.push('/game');
        } else {
          confirmChangeGame.value = true;
          selectedGameId.value = gameId;
        }
      },
      signOut() {
        $q.loading.show();
        rio.value.signOut();
      },
    };
  },
});
</script>
