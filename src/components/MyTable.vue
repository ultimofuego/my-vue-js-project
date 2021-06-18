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
    options() {
      return {
        chart: {
          id: 'fb'
        },
        xaxis: {
          categories: [...new Set(this.createDates())]
        },
        colors: ['#6B6779','#EDC072', '#B5CFC6'],
        stroke: {
          curve: 'smooth'
        }
      }
    },
    series() {
      return [{
        name: 'EUR',
        //data: this.$store.state.rowData.filter(cur => cur.currency==="EUR").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate)
        data: this.createValues('EUR')
      },{
        name: 'RUB',
        //data: this.$store.state.rowData.filter(cur => cur.currency==="RUB").sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.rate)
        data: this.createValues('RUB')
      },{
        name: 'USD',
        data: this.createValues('USD')
      }]
    }
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    },
    createValues(str) {
      let myArr = []
      for(let i = 0; i < this.$store.state.rowData.length; i++) {
        if(this.$store.state.rowData[i].currency == str) {
          myArr.push(this.$store.state.rowData[i].rate)
        } else myArr.push(null)
      }
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