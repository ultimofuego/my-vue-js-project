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
        },
        getPlotData() {

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
        }
    }
})