<template>
  <Loader v-if="this.$store.state.loading"></Loader>
  <div v-else class="container">
    <router-link to="/addrow" class="addButton">Add Data</router-link>
    <div class="container-inner">
      <table v-if="allNotes.length > 0" class="content-table">
        <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Currency</th>
              <th scope="col">Rate</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allNotes" :key="index">
            <td>{{item.date}}</td>
            <td>{{item.currency}}</td>
            <td>{{item.rate}}</td>
            <td><button class="removeButton" @click="removeRow(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <apexchart 
      width="500" type="line" 
      :options="options" :series="series">
    </apexchart>
    </div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from './Loader.vue'

export default {
  computed: {
    ...mapGetters(["allNotes"]),
    // plotData() {
    //   let temp = {}
    //   temp.xEUR = this.$store.state.rowData.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
    //   temp.yEUR = this.$store.state.rowData.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate),
    //   temp.xRUB = this.$store.state.rowData.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
    //   temp.yRUB = this.$store.state.rowData.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate),
    //   temp.xUSD = this.$store.state.rowData.filter(cur => cur.currency==="USD").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date),
    //   temp.yUSD = this.$store.state.rowData.filter(cur => cur.currency==="USD").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate)
    //   return temp
    // },
    options() {
      return {
        chart: {
          id: 'fb'
        },
        xaxis: {
          categories: this.$store.state.rowData.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date)
        },
        colors: ['#6B6779','#EDC072', '#B5CFC6'],
        stroke: {
          curve: 'smooth'
        }
      }
    },
    series() {
      return [{
        name: 'series-1',
        data: this.$store.state.rowData.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate)
      },{
        name: 'series-1',
        data: this.$store.state.rowData.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate)
      }]
    }
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    }
  },
  components: {
    Loader
  }
}
</script>