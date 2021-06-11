import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            rowData: []
        }
    },
    getters: {
        allNotes(state) {
            return state.rowData
        }
    },
    actions: {
        async fetchNotes(ctx) {
            const {data} = await axios.get('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json')
            const res = Object.keys(data).map(key => {
                return {
                    id: key,
                    value: data[key]
                }
            })
            for(let i = 0; i < res.length; i++)
            {
                ctx.commit('addRow', res[i].value) 
            }
        },
        async pushtoDB(ctx, rowData) {
            const response = await axios.post('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json', rowData)
            ctx.commmit('updateNotes', response.data)
        }
    },

    mutations: {
        updateNotes(state, rowData) {
            state.rowData = rowData
        },
        addRow(state, rowData) {
            state.rowData.push(rowData)
        },
        removeRow(state, idx) {
            state.rowData.splice(idx,1)
        }
    }
})