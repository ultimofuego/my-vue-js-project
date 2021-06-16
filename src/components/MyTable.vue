<template>
    <router-link to="/addrow">Добавить данные</router-link>
    <table v-if="allNotes.length > 0" table class="table table-sm">
      <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Currency</th>
            <th scope="col">Rate</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allNotes" :key="index">
          <td>{{item.date}}</td>
          <td>{{item.currency}}</td>
          <td>{{item.rate}}</td>
          <button class="btn btn-danger" @click="removeRow(index)">Remove</button>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert">No data</div>
    <apexchart 
     width="500" type="line" 
     :options="options" :series="series">
   </apexchart>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
  ...mapGetters(["allNotes"])
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    }
  },
  mounted() {
    //this.$store.commit('updateNotes',this.$store.state.rowData)
  },
  // data() {
  //   return {
  //     options: {
  //       chart: {
  //             id: 'fb'
  //           },
  //       xaxis: {
  //         categories: this.$store.state.plotData.xRUB
  //       }
  //     },
  //     series: [{
  //       name: 'series-1',
  //       data: this.$store.state.plotData.yRUB
  //     }]
  //   }
  // }
}
//PLOT


</script>