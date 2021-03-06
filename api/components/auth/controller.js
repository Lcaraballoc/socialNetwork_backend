const bcrypt = require('bcrypt')
const TABLE = 'auth';
const auth = require('../../../auth')
const error = require('../../../utils/error');


module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/msql')
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });

        return bcrypt.compare(password, data.password)
            .then(match => {
                if (match) {
                    //generar token
                    return auth.sign({...data})
                } else {
                    throw error('Informacion invalida')
                }
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 7)
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    }
}