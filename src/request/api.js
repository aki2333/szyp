/**   
 * api接口统一管理
 */
import http from './http'

const getUserAuthority = p => http.post('/userController/getUserAuthority', p);
export default {
  getUserAuthority
}