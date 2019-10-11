import { request } from '../config'

export const getUserList = params => request.get('/user', { params })

export const getInitData = params => request.get('/init', { params })
