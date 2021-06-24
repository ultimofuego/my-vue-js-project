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
    <Loader v-if="loading"></Loader>
    <apexchart v-else
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
          type: 'line'
        },
        xaxis: {
          categories: this.createDates
        },
        colors: this.createColors,
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
      return this.createArray
    },
    createDates() {
      return [...new Set(this.allNotes.map(a=>a.date).sort((a,b)=>a > b ? 1 : -1))]
    },
    createArray() {
      const cur = [...new Set(this.allNotes.map(a => a.currency))] 
      const myArr = []
      console.log(cur)
      for(let i = 0; i < cur.length; i++) { 
        const c = cur[i]
        myArr.push({
          name: c,
          data: this.createNulls(c, this.allNotes)
        })
      }
      return myArr
    },
    createColors() {
      const cur = [...new Set(this.allNotes.map(a => a.currency))]
      const colors = []
      cur.forEach(() => {
        colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      })
      return colors
    }
  },
  methods: {
    removeRow(index) {
      this.$store.dispatch('removefromDB', index)
    },
    createNulls(c, data) {
      const myArr = []
      const dates = this.createDates 
      for(let i = 0; i < dates.length; i++) {
        const result = data.filter(item => (item.date === dates[i] && item.currency === c))
        if(result.length != 0) {
          myArr.push(result[0].rate)
        } else {
          myArr.push(null)
        }
      }
      return myArr
    }
  },
  components: {
    Loader
  }
}
</script>