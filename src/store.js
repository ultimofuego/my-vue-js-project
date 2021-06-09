import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            rowData: {
                userId: '',
                title: '',
                body: ''
              }
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

            let my_obj = {
                userId: rowData.userId,
                title: rowData.title,
                body: rowData.body
            }

            state.rowData.push(my_obj)
            // state.rowData.body=''
            // state.rowData.title=''
            // state.rowData.userId=''
    
        }
        
    }
})