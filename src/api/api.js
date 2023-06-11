import axios from 'axios'

export default () => {
    const axiosInstance = axios.create({
        baseURL: `${process.env.VUE_APP_URL}`
    })

    const token = localStorage.getItem('token')
    if (token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            /** user authentication failed */
            const code = error?.response?.status
            switch (code) {
                /** handled server errors */
                case 500:
                    console.log(error.response?.data?.message)
                    break;
                case 401:
                    // localStorage.removeItem('token')
                    // localStorage.removeItem('user')
                    location.reload()
                    console.log("جلسه کاری شما به پایان رسیده است")
                    break;
                case 403:
                    document.location.href = '/login'
                    break;
                /** uknonw errors */
                default:
                    console.log("یک خطا رخ داده است لطفا بعدا مجددا تلاش نمایید")
            }
            return Promise.reject(error)
        }
    )
    return axiosInstance
}