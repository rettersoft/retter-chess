<template>
  <q-page class="row items-center justify-evenly">
    <div id="chessboard">
      <div
        v-for="cell in chessboard"
        :key="cell.id"
        :class="cell.color"
        v-bind="cell"
        @click="onSelect"
      />
    </div>
    <q-fab
      color="blue"
      text-color="white"
      icon="keyboard_arrow_left"
      direction="left"
    >
      <q-fab-action
        color="blue"
        text-color="white"
        icon="exit_to_app"
        @click="onLeave"
        title="Leave"
      />
      <q-fab-action
        color="blue"
        text-color="white"
        icon="download"
        @click="onDrop"
        title="Drop"
        v-show="selected.value"
      />
    </q-fab>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import RetterIO from '@retter/sdk';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { RioClasses } from '../libs/rio';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const pieces: Record<string, string> = {
  P: '&#9817;',
  R: '&#9814;',
  B: '&#9815;',
  N: '&#9816;',
  Q: '&#9813;',
  K: '&#9812;',
  p: '&#9823;',
  r: '&#9820;',
  b: '&#9821;',
  n: '&#9822;',
  q: '&#9819;',
  k: '&#9818;',
};
const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function calculateChessBoard() {
  const cells: Array<{ id: string; color: string }> = [];
  for (let row = 8; row > 0; row--) {
    let color = row % 2 ? 'black' : 'white';
    for (let i = 0; i < letters.length; i++) {
      const id = `${letters[i]}${row}`;
      cells.push({ id, color });
      color = color === 'white' ? 'black' : 'white';
    }
  }
  return cells;
}

export default defineComponent({
  name: 'Chessboard',
  props: ['currentGameId', 'rio', 'userProfile'],
  setup(props) {
    const $q = useQuasar();
    const $router = useRouter();
    $q.loading.show();

    let game: RioClasses.Game | undefined = undefined;
    let $game: any | undefined = undefined;
    const gameId = props.currentGameId as string;
    const chessboard = ref(calculateChessBoard());
    const games = ref({ [gameId]: false });
    const selected = ref('');

    function renderPieces(board: any) {
      for (let row = 8; row > 0; row--) {
        for (let i = 0; i < letters.length; i++) {
          const id = `${letters[i]}${row}`;
          const val = board.pieces[id];
          const piece = val ? pieces[val] : '&nbsp;';
          const el = document.getElementById(id);
          if (el) el.innerHTML = piece;
        }
      }
    }

    if (!props.userProfile.online) $router.push('/sign-in');

    onMounted(() => {
      const gameId = props.currentGameId as string;
      RioClasses.Game.getInstance(props.rio as RetterIO, {
        classId: 'Game',
        instanceId: props.currentGameId,
      })
        .then((g) => {
          game = g;
          g._obj.state?.public.subscribe((s) => {
            $game = s;
            renderPieces(s.board);
            games.value[gameId] = true;
            $q.loading.hide();
          });
        })
        .catch((err) => {
          console.log(err);
          $router.push('/');
        });
    });

    onUnmounted(() => {
      const gameId = props.currentGameId as string;
      games.value[gameId] = false;
    });

    return {
      chessboard,
      games,
      selected,

      onSelect(e: { srcElement: HTMLElement }) {
        const turn: string = $game.board.turn;
        if (props.userProfile.uid === $game[turn]) {
          const el = e.srcElement;
          if (selected.value) {
            const prevEl = document.getElementById(selected.value);
            if (prevEl && game)
              game
                .play({ from: selected.value, to: el.id })
                .then(() => {
                  prevEl.classList.remove('selectedPiece');
                  selected.value = '';
                })
                .catch((e) => {
                  console.log(e);
                  prevEl.classList.remove('selectedPiece');
                  selected.value = '';
                });
          } else {
            el.classList.add('selectedPiece');
            selected.value = el.id;
          }
        } else selected.value = '';
      },
      onLeave() {
        if (game) game.leave();
      },
      onDrop() {
        selected.value = '';
      },
    };
  },
});
</script>
