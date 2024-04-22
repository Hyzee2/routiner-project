import { createStore } from 'vuex'


const store = createStore( {
    state: {
        user: {  // 새로운 상태 추가
            id: null,
            name: null
        }
    },
    mutations: {            // Java의 setter 개념 - 데이터 넘겨주기
        setUser(state, userInfo) {  // 파라미터 구조 분해 할당 사용
            const { id, name } = userInfo;
            console.log(userInfo);
            console.log("ID", id);
            state.user.id = id;
            state.user.name = name;
        },
       
            },
    getters: {
        getUserList(state){
            return state.user;
        }
    }
})

export default store;