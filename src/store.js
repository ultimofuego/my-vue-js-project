import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            rowData: [],
            plotData: {}
        }
    },
    getters: {
        allNotes(state) {
            return state.rowData
        }
    },
    actions: {
        fetchNotes(ctx) {
            axios.get('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json')
            .then(res => {
                res = Object.keys(res.data).map(key => {
                    return {
                        id: key,
                        value: res.data[key]
                    }
                })
                for(let i = 0; i < res.length; i++)
                {
                    ctx.commit('addRow', res[i].value) 
                }

            })
        },
        pushtoDB(ctx, rowData) {
            axios.post('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json', rowData).then(ctx.commit('addRow', rowData))
        },
        removefromDB(ctx, index) {
            axios.get('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json')
            .then(res => {
                res = Object.keys(res.data).map(key => {
                    return {
                        id: key,
                        value: res.data[key]
                    }
                })
                axios.delete(`https://ultimofuego-47283-default-rtdb.firebaseio.com/notes/${res[index].id}.json`)
                .then(ctx.commit('removeRow', index))
            })
        }
    },

    mutations: {
        updateNotes(state, rowData) {
            state.rowData = rowData
        },
        addRow(state, rowData) {
            state.rowData.push(rowData)
        },
        removeRow(state, index) {
            state.rowData.splice(index,1)
        },
        dataPlot(state, rowData) {
            console.log(rowData)
            const filteredTempEUR = rowData.filter(cur => cur.currency==="EUR").sort((a, b) => a.date > b.date ? 1 : -1)
            const filteredTempRUB = rowData.filter(cur => cur.currency==="RUB").sort((a, b) => a.date > b.date ? 1 : -1)
            const filteredTempUSD = rowData.filter(cur => cur.currency==="USD").sort((a, b) => a.date > b.date ? 1 : -1)
            return state.plotData = {
              xEUR: filteredTempEUR.map(a=>a.date),
              yEUR: filteredTempEUR.map(a=>a.rate),
              xRUB: filteredTempRUB.map(a=>a.date),
              yRUB: filteredTempRUB.map(a=>a.rate),
              xUSD: filteredTempUSD.map(a=>a.date),
              yUSD: filteredTempUSD.map(a=>a.rate)
            }
          }
    }
})