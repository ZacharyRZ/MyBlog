import jwtDecode from 'jwt-decode'
import * as types from '../constants'
import service from '@/service'
import storage from '@/utils/storage'
import md5 from 'js-md5'

const state = {
    token: storage.read('token'),
}

const mutations = {
    [types.MUTATION_AUTH_UPDATE](state, value) {
        //console.log(jwtDecode(value))
        state.token = value;
        storage.write('token', value)
        //this.$store.dispatch("GetRoleRoute")
    },
}

const actions = {
    [types.ACTION_AUTH_LOGIN]({
        commit
    }, {
        username = '',
        password = ''
    }) {
        if (!username.length) {
            return Promise.reject(-1)
        } else if (!password.length) {
            return Promise.reject(-2)
        } else {
            return service.user.login(username, md5(password)).then(token => {
                //console.log(token)
                commit(types.MUTATION_AUTH_UPDATE, token)
                return service.menu.GetMenu(jwtDecode(token).roles[0]).then(res => {
                    //console.log(turntomenu(res.data.data))
                    storage.write('menu', JSON.stringify(res.data.data.list));
                    return Promise.resolve()
                })
                //commit('d2adminUserInfoSet',token)
                //return Promise.resolve()
            })
        }
    },
    [types.ACTION_AUTH_LOGOUT]({
        commit
    }) {
        commit(types.MUTATION_AUTH_UPDATE, null)
    }
}

const getters = {
    // [types.GETTER_AUTH_ROLE](state) {
    //     try {
    //         return jwtDecode(state.token).roles[0]
    //     } catch (e) {
    //         return null
    //     }
    // },
    [types.GETTER_AUTH_NAME](state) {
        try {
            return jwtDecode(state.token).name
        } catch (e) {
            return null
        }
    },
    [types.GETTER_AUTH_ACCESSTOKEN](state) {
        return state.token
    },
    [types.GETTER_AUTH_PAYLOD](state) {
        try {
            return jwtDecode(state.token)
        } catch (e) {
            return null
        }
    },
    [types.GETTER_AUTH_ISAUTH](state, getters, rootgetters) {
        var _paylod = getters[types.GETTER_AUTH_PAYLOD]
        //console.log(_paylod)
        if (_paylod) {
            return _paylod.exp * 1000 > rootgetters[types.GETTER_TIMESTAMP]
        }
        return false
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}