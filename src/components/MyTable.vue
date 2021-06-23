<template>
  <Loader v-if="this.$store.state.loading"></Loader>
  <div class="container">
    <div class="table-container">
      <router-link to="/addrow" class="addButton"><p>Add Data</p></router-link>  
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
  data() {
    return {
      options: {
        chart: {
          id: 'fb'
        },
        xaxis: {
          categories: ['1','2']
        },
        colors: ['#111111'],
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
      },
      series: [{
        name: '2',
        data: [3,4]
      }]
    }
  },
  computed: {
    ...mapGetters(["allNotes"]),
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    },
    createNulls(c, data) {
      const myArr = []
      const dates = this.createDates() //массив дат без повторений
      console.log(dates)

      for(let i = 0; i < dates.length; i++) {
        const result = data.filter(item => (item.date === dates[i] && item.currency === c))
        if(result.length != 0) {
          myArr.push(result[0].rate)
        } else {
          myArr.push(null)
        }
      }
      return myArr
    },
    createDates() {
      return [...new Set(this.allNotes.map(a=>a.date).sort((a,b)=>a > b ? 1 : -1))]
    },
    createArray() {
      let storeData = this.allNotes
      const cur = [...new Set(storeData.map(a => a.currency))] //массив названий валют, без повторений
      const myArr = []
      
      for(let i = 0; i < cur.length; i++) { //пробегаюсь по массиву и для каждой валюты в массив пушу объект
         const c = cur[i]
         myArr.push({
           name: c,
           data: this.createNulls(c, storeData) //здесь должен быть массив с null
         })
       }
      console.log(myArr)
      return myArr
    },
    createColors() {
      let storeData = this.allNotes
      const cur = [...new Set(storeData.map(a => a.currency))]
      const colors = []
      console.log(storeData)
      cur.forEach(() => {
        colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      })
      return colors
    }
  },
  components: {
    Loader
  },
  created() {
    this.series = this.createArray()
    this.options.xaxis.categories = this.createDates()
    this.options.colors = this.createColors()
  }
}
</script>