import http from '@/http'
import BaseService from './base'


export class BlogService extends BaseService {
    GetAllBlogs(params) {
        // return http.get('/admin/blog/list',params).then(res => {
        //     return Promise.resolve(res)
        // })
        return http({
            method: 'get',
            url: '/admin/blog/list',
            params,
            timeout: 30000
        }).then(res => { return Promise.resolve(res)})
    }
    delBlog(data){
        return http({
            method: 'post',
            url: '/admin/blog/update',
            data,
            timeout: 30000
        }).then(res => { return Promise.resolve(res)})
    }
    deletebyisvisiable(data){
        return http({
            method: 'post',
            url: '/admin/blog/deletebyisvisiable',
            data:{_id: data},
            timeout: 30000
        }).then(res => { return Promise.resolve(res)})
    }
}

var service = new BlogService()
export default service