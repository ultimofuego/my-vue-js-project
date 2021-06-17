<template>
<div class="container">
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
    <div v-else class="alert">No data</div>
    <apexchart 
     width="500" type="line" 
     :options="options" :series="series">
   </apexchart>
  </div>
    
</div>
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
  },
  data() {
    return {
      options: {
        chart: {
          id: 'fb'
        },
        xaxis: {
          categories: ['2012-05-10','2012-05-11','2012-05-14']
        },
        colors: ['#6B6779','#EDC072', '#B5CFC6'],
        stroke: {
          curve: 'smooth'
        }
      },
      series: [{
        name: 'series-1',
        data: [32,41,22],
      },
      {
        name: 'series-2',
        data: [47,32,50]
      },
      {
        name: 'series-3',
        data: [56,10,5]
      }]
    }
  }
}
//PLOT


</script>