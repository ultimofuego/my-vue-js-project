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
            const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            const rowData = await res.json()
            ctx.commit('updateNotes', rowData)
        },
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