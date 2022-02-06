<template>
  <q-item clickable @click="$emit('change-game', gameId)">
    <q-item-section avatar>
      <q-icon name="play_circle_outline" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        #{{ gameId }}
        <small>({{ side }})</small>
      </q-item-label>
      <q-item-label caption>
        {{ formatDate(new Date(createdAt)) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import formatDate from 'date-fns/format';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameList',
  props: ['gameId', 'side', 'createdAt'],
  setup() {
    return {
      formatDate(d: Date) {
        return formatDate(d, 'dd.MM.yyyy HH:mm');
      },
    };
  },
});
</script>
