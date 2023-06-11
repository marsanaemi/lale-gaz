import Api from "@/api/api";

export default {
    login(data) {
        return Api().post('auth/login', data)
    },
    verify(data) {
        return Api().post('auth/verify', data)
    },
    getUser() {
        return Api().get('auth/user')
    }
};