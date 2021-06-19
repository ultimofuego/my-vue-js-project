<template>
  <Loader v-if="this.$store.state.loading"></Loader>
  <div class="container">
    <div class="table-container">
      <router-link to="/addrow" class="addButton"><p>Add Data</p></router-link>  
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
    </div>
    <apexchart 
      width="600" height="350" type="line" class="apexchart"
      :options="options" :series="series">
    </apexchart>
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
        },
        responsive: [{
          breakpoint: 1030,
          options: {
            chart: {
              width: 400,
              height: 300
            }
          }
        }, {
          breakpoint: 600,
          options: {
            chart: {
              width: 250,
              height: 250
            }
          }
        }]
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