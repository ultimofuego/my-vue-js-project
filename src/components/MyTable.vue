<template>
    <router-link to="/addrow">Добавить данные</router-link>
    <table v-if="allNotes.length > 0" table class="table table-sm">
      <thead>
          <tr>
            <th scope="col">userId</th>
            <th scope="col">title</th>
            <th scope="col">body</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allNotes" :key="index">
          <td>{{item.userId}}</td>
          <td>{{item.title}}</td>
          <td>{{item.body}}</td>
          <button class="btn btn-danger" @click="removeRow(index)">Remove</button>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert">No data</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
    ...mapGetters(["allNotes"])
    },
    methods: {
        removeRow(idx) {
            this.$store.commit('removeRow', idx)
        }
    }
}
</script>