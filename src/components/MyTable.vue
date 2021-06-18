<template>
  <Loader v-if="this.$store.state.loading"></Loader>
  <div v-else class="container">
    <router-link to="/addrow" class="addButton">Add Data</router-link>
    <div class="container-inner">
      <table v-if="allNotes.length > 0" class="content-table">
        <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">RUB</th>
              <th scope="col">USD</th>
              <th scope="col">EUR</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allNotes" :key="index">
            <td>{{item.date}}</td>
            <td>{{item.rateRUB}}</td>
            <td>{{item.rateUSD}}</td>
            <td>{{item.rateEUR}}</td>
            <td><button class="removeButton" @click="removeRow(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <apexchart 
        width="600" height="350" type="line" 
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
    options() {
      return {
        chart: {
          id: 'fb'
        },
        xaxis: {
          categories: this.createDates()
        },
        colors: ['#6B6779','#EDC072', '#B5CFC6'],
        stroke: {
          curve: 'smooth'
        }
      }
    },
    series() {
      return [{
        name: 'RUB',
        data: this.createValuesRUB()
      },{
        name: 'USD',
        data: this.createValuesUSD()
      },{
        name: 'EUR',
        data: this.createValuesEUR()
      }]
    }
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    },
    createValuesRUB() {
      let myArr = []
      for(let i = 0; i < this.$store.state.rowData.length; i++) {
        myArr.push(this.$store.state.rowData[i].rateRUB)
      }
      console.log(myArr)
      return myArr
    },
    createValuesUSD() {
      let myArr = []
      for(let i = 0; i < this.$store.state.rowData.length; i++) {
        myArr.push(this.$store.state.rowData[i].rateUSD)
      }
      console.log(myArr)
      return myArr
    },
    createValuesEUR() {
      let myArr = []
      for(let i = 0; i < this.$store.state.rowData.length; i++) {
        myArr.push(this.$store.state.rowData[i].rateEUR)
      }
      console.log(myArr)
      return myArr
    },
    createDates() {
      return this.$store.state.rowData.sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date)
    }
  },
  components: {
    Loader
  }
}
</script>