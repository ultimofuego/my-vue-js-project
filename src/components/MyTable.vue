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
    ...mapGetters(["allNotes"]),
    plotData() {
      return {
        xEUR: this.allNotes.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
        yEUR: this.allNotes.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate),
        xRUB: this.allNotes.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
        yRUB: this.allNotes.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate),
        xUSD: this.allNotes.filter(cur => cur.currency==="USD").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
        yUSD: this.allNotes.filter(cur => cur.currency==="USD").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate),
      }
    }
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    }
  },
  mounted() {
    //this.$store.commit('updateNotes',this.$store.state.rowData)
    console.log(this.plotData)
  },
  data() {
    return {
      options: {
        chart: {
              id: 'fb'
            },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  }
}
//PLOT


</script>